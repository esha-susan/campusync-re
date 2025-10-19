import { supabase } from '../../Supabaseclient'; // Adjust path if this is incorrect

/**
 * Creates a new assignment in the database.
 * @param {object} assignmentData - The assignment details from the form.
 * @returns {object} The newly created assignment data.
 */
export const createAssignment = async (assignmentData) => {
  const { data, error } = await supabase
    .from('assignments')
    .insert([assignmentData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Fetches all assignments and includes a count of their submissions.
 */
export const getAssignments = async () => {
  const { data, error } = await supabase
    .from('assignments')
    .select(`*, submissions ( count )`);

  if (error) throw error;
  
  return data.map(a => ({
    ...a,
    submissions: a.submissions[0]?.count || 0,
    totalStudents: 50, // This can be dynamic later
  }));
};

/**
 * Fetches the details of a single assignment by its ID.
 */
export const getAssignmentById = async (assignmentId) => {
    const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('id', assignmentId)
        .single();
    if (error) throw error;
    return data;
};

/**
 * Checks if a specific student has a submission for a specific assignment.
 */
export const getStudentSubmissionStatus = async (assignmentId, studentId) => {
    const { data, error } = await supabase
        .from('submissions')
        .select('id')
        .eq('assignment_id', assignmentId)
        .eq('student_id', studentId)
        .maybeSingle();

    if (error) throw error;
    return data;
};

/**
 * Fetches all submissions for a specific assignment, including the student's name.
 */
export const getSubmissionsForAssignment = async (assignmentId) => {
  const { data, error } = await supabase
    .from('submissions')
    .select(`
      id,
      submission_date,
      file_url,
      grade,
      feedback,
      comments,
      student:users ( full_name, id_number )
    `)
    .eq('assignment_id', assignmentId);

  if (error) throw error;
  return data;
};

/**
 * Saves a grade and feedback for a specific submission.
 */
export const saveEvaluation = async ({ submissionId, grade, feedback }) => {
  const { data, error } = await supabase
    .from('submissions')
    .update({ grade, feedback })
    .eq('id', submissionId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Submits a student's file and comments for an assignment.
 */
export const submitAssignment = async ({ assignmentId, studentId, file, comments }) => {
  if (!file) throw new Error('A file is required for submission.');
  const filePath = `public/${studentId}/${assignmentId}/${Date.now()}_${file.name}`;
  const { error: uploadError } = await supabase.storage.from('submissions').upload(filePath, file);
  if (uploadError) throw uploadError;
  const { data: urlData } = supabase.storage.from('submissions').getPublicUrl(filePath);
  const publicURL = urlData.publicUrl;
  const { data, error: recordError } = await supabase.from('submissions').insert([{ assignment_id: assignmentId, student_id: studentId, file_url: publicURL, comments: comments }]).select().single();
  if (recordError) throw recordError;
  return data;
};