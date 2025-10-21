import { supabase } from '../../Supabaseclient';

/**
 * Submits a new query from a student to the database.
 */
export const submitQuery = async (queryData, studentId) => {
  const newQuery = {
    ...queryData,
    student_id: studentId,
    status: 'open',
  };

  const { data, error } = await supabase
    .from('queries')
    .insert([newQuery]);

  if (error) {
    console.error("Error submitting query:", error);
    throw error;
  }
  return data;
};

/**
 * Fetches a list of potential query recipients (faculty/admins).
 */
export const getQueryRecipients = async () => {
  const { data, error } = await supabase.rpc('get_query_recipients');

  if (error) {
    console.error("Could not load recipient list:", error);
    throw error;
  }
  return data;
};

/**
 * Fetches all queries relevant to the current user's role.
 */
export const getQueriesForRole = async () => {
    const { data, error } = await supabase.rpc('get_queries_for_current_user'); 
    
    if (error) {
        console.error("Error fetching queries for role:", error);
        throw error;
    }
    return data;
}

/**
 * Fetches the full details of a single query by its ID.
 */
export const getQueryById = async (queryId) => {
  // ======================= THIS IS THE ONLY CHANGE =======================
  // The function name has been corrected to match the hint from the error log.
  const { data, error } = await supabase
    .rpc('get_query_details_by_id', { p_query_id: queryId });
  // =======================================================================

  if (error) {
    console.error(`Error fetching query details for ID ${queryId}:`, error);
    throw error;
  }
  
  // The RPC function should return a single object, or an array with one object.
  return data[0] || data;
};

/**
 * Posts a new response to a query.
 */
export const postQueryResponse = async (queryId, responseText, authorId, authorName) => {
  const { data, error } = await supabase
    .rpc('add_query_response', {
      p_query_id: queryId,
      p_author_id: authorId,
      p_author_name: authorName,
      p_response_text: responseText
    });

  if (error) {
    console.error(`Error posting response to query ${queryId}:`, error);
    throw error;
  }

  return data;
};