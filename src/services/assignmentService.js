import { supabase } from '../../Supabaseclient';

/**
 * Creates a new assignment in the database.
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
 * Fetches ALL assignments and their stats. Used for the student view.
 */
export const getAllAssignments = async () => {
  const { data, error } = await supabase.rpc('get_assignment_stats');

  if (error) {
    console.error("Error calling RPC get_assignment_stats:", error);
    throw error;
  }
  
  return data.map(a => ({
    ...a,
    submissions: a.total_submissions || 0,
    gradedCount: a.graded_submissions || 0,
    totalStudents: 50, // This can be dynamic later
  }));
};

/**
 * Fetches only the assignments created by a specific faculty member.
 */
export const getAssignmentsForFaculty = async (facultyId) => {
  const { data, error } = await supabase.rpc('get_assignments_for_faculty', {
    p_faculty_id: facultyId
  });

  if (error) {
    console.error("Error calling RPC get_assignments_for_faculty:", error);
    throw error;
  }
  
  return data.map(a => ({
    ...a,
    submissions: a.total_submissions || 0,
    gradedCount: a.graded_submissions || 0,
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
 * Checks a student's submission for an assignment and returns the grade if available.
 */
export const getStudentSubmissionStatus = async (assignmentId, studentId) => {
  const { data, error } = await supabase
      .from('submissions')
      .select('id, grade')
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

  if (error) {
    console.error("Critical error in getSubmissionsForAssignment:", error);
    throw error;
  }
  return data;
};

/**
 * Fetches the full details of a student's submission, including the grade,
 * feedback, and the original assignment's title.
 */
export const getSubmissionDetails = async (assignmentId, studentId) => {
  const { data, error } = await supabase
    .from('submissions')
    .select(`
      grade,
      feedback,
      file_url,
      assignment:assignments ( title, subject )
    `)
    .eq('assignment_id', assignmentId)
    .eq('student_id', studentId)
    .single();

  if (error) {
    console.error("Error fetching submission details:", error);
    throw error;
  }

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