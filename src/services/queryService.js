import { supabase } from '../../Supabaseclient';

// ... (submitQuery, getQueriesForRole, getQueryRecipients are all correct)

// ======================= THIS IS THE DEFINITIVE FIX =======================
/**
 * Fetches the full details of a single query using a secure database function.
 */
export const getQueryById = async (queryId) => {
  const { data, error } = await supabase.rpc('get_query_details_by_id', {
    p_query_id: queryId
  });

  if (error || !data || data.length === 0) {
    console.error("Error calling RPC get_query_details_by_id:", error);
    // Throw a specific error if the query is not found
    throw new Error('Query not found.');
  }

  const queryData = data[0]; // RPC returns an array, we need the first item

  // Reformat the data to be easier to use in the component
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
// ========================================================================


/**
 * Posts a new response to a query and updates its status.
 */
export const postQueryResponse = async (queryId, responseText, authorName, newStatus = 'answered') => {
  const { data: currentQuery, error: fetchError } = await supabase
    .from('queries')
    .select('responses')
    .eq('id', queryId)
    .single();

  if (fetchError) throw fetchError;

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

// ... (The rest of your service file is correct)