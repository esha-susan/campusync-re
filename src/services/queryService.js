// src/services/queryService.js

import { supabase } from '../../Supabaseclient';

/**
 * Submits a new query from a student to the database.
 * This function remains unchanged and is correct.
 */
export const submitQuery = async (formDataFromComponent, studentId) => {
  const queryForDatabase = {
    faculty_id: formDataFromComponent.recipient_id,
    message: formDataFromComponent.message,
    subject: formDataFromComponent.subject,
    category: formDataFromComponent.category,
    priority: formDataFromComponent.priority,
    student_id: studentId,
    status: 'open',
  };
  const { data, error } = await supabase.from('queries').insert([queryForDatabase]);
  if (error) { throw error; }
  return data;
};

/**
 * Fetches a list of potential query recipients (faculty/admins).
 * This function remains unchanged and is correct.
 */
export const getQueryRecipients = async () => {
  const { data, error } = await supabase.rpc('get_query_recipients');
  if (error) { throw error; }
  return data;
};


// --- THE DEFINITIVE FIX IS HERE ---
// We are completely replacing the logic for getQueriesForRole.
/**
 * Fetches all queries relevant to the current user's role.
 * This version uses a direct query instead of the broken RPC function.
 */
export const getQueriesForRole = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  // Get the user's role from your 'users' table
  const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
  const userRole = profile?.role;

  // Build the query
  let query = supabase
    .from('queries')
    .select(`
      id,
      subject,
      category,
      priority,
      status,
      created_at,
      student:users!student_id ( full_name )
    `)
    .order('created_at', { ascending: false });

  // Add a filter based on the user's role
  if (userRole === 'student') {
    query = query.eq('student_id', user.id);
  } else {
    query = query.eq('faculty_id', user.id);
  }

  // Execute the query
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching queries for role:", error);
    throw error;
  }

  // Format the data to match what the component expects
  return data.map(q => ({
    id: q.id,
    studentName: q.student?.full_name || 'N/A',
    subject: q.subject,
    category: q.category,
    priority: q.priority,
    status: q.status,
    date: new Date(q.created_at).toLocaleDateString(),
  }));
}
// --- END OF THE FIX ---


/**
 * Fetches the full details of a single query by its ID.
 * This function remains unchanged and is correct.
 */
export const getQueryById = async (queryId) => {
  const { data, error } = await supabase.rpc('get_query_details_by_id', { p_query_id: queryId });
  if (error) { throw error; }
  return data[0] || data;
};

/**
 * Posts a new response to a query.
 * This function remains unchanged and is correct.
 */
export const postQueryResponse = async (queryId, responseText, authorId, authorName) => {
  const { data, error } = await supabase.rpc('add_query_response', {
      p_query_id: queryId, p_author_id: authorId, p_author_name: authorName, p_response_text: responseText
    });
  if (error) { throw error; }
  return data;
};