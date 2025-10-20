import { supabase } from '../../Supabaseclient';

/**
 * Submits a new query from a student.
 * Aligned with QueryForm.js
 * @param {object} queryData - The form data (subject, category, etc.).
 * @param {string} studentId - The UUID of the student submitting the query.
 */
export const submitQuery = async (queryData, studentId) => {
  const newQuery = {
    ...queryData,
    student_id: studentId,
    status: 'open',
  };

  const { data, error } = await supabase
    .from('queries')
    .insert([newQuery])
    .select();

  if (error) {
    console.error("Error submitting query:", error);
    throw error;
  }

  return data;
};

/**
 * Fetches queries based on the role of the currently logged-in user.
 * Aligned with QueryListPage.js
 * This function relies on a Supabase RPC function and RLS policies.
 */
export const getQueriesForRole = async () => {
  // ======================= THIS IS THE CORRECTION =======================
  // The RPC function name has been changed to match the one in your database.
  const { data, error } = await supabase.rpc('get_all_queries_for_inbox');
  // =======================================================================

  if (error) {
    console.error("Error fetching queries for role:", error);
    throw error;
  }

  // Format the date for display
  return data.map(query => ({
    ...query,
    date: new Date(query.created_at).toLocaleString(),
  }));
};

/**
 * Fetches a list of potential query recipients (faculty/admins).
 * Aligned with QueryForm.js
 */
export const getQueryRecipients = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, role')
    .neq('role', 'student');

  if (error) {
    console.error("Could not load recipient list:", error);
    throw error;
  }

  return data.map(profile => ({
    label: `${profile.full_name} (${profile.role})`,
    value: profile.id,
  }));
};


/**
 * Fetches the full details of a single query by its ID.
 * Aligned with QueryDetailPage.js
 * @param {string} queryId - The ID of the query to fetch.
 */
export const getQueryById = async (queryId) => {
  const { data, error } = await supabase.rpc('get_query_details_by_id', {
    p_query_id: queryId
  });

  if (error || !data || data.length === 0) {
    console.error("Error calling RPC get_query_details_by_id:", error);
    throw new Error('Query not found.');
  }

  const queryData = data[0];

  return {
    id: queryData.id,
    subject: queryData.subject,
    studentName: queryData.student_full_name || 'Unknown Student',
    category: queryData.category,
    date: new Date(queryData.created_at).toLocaleString(),
    status: queryData.status,
    queryText: queryData.message,
    attachmentUrl: queryData.attachment_url,
    responses: queryData.responses || [],
  };
};


/**
 * Posts a new response to a query and updates its status.
 * Aligned with QueryDetailPage.js
 * @param {string} queryId - The ID of the query being responded to.
 * @param {string} responseText - The text of the response.
 * @param {string} authorName - The name of the person responding.
 * @param {string} newStatus - The new status for the query.
 */
export const postQueryResponse = async (queryId, responseText, authorName, newStatus = 'answered') => {
  const { data: currentQuery, error: fetchError } = await supabase
    .from('queries')
    .select('responses')
    .eq('id', queryId)
    .single();

  if (fetchError) {
    console.error("Error fetching current query to update:", fetchError);
    throw fetchError;
  }

  const newResponse = {
    author: authorName,
    text: responseText,
    date: new Date().toISOString(),
  };

  const updatedResponses = [...(currentQuery.responses || []), newResponse];

  const { data, error: updateError } = await supabase
    .from('queries')
    .update({
      responses: updatedResponses,
      status: newStatus,
    })
    .eq('id', queryId)
    .select()
    .single();

  if (updateError) {
    console.error("Error posting query response:", updateError);
    throw updateError;
  }

  return data;
};