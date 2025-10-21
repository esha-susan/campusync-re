import { supabase } from '../../Supabaseclient';

/**
 * Fetches all personal calendar notes for the currently logged-in user.
 * The RLS policy in Supabase ensures they only get their own notes.
 */
export const getNotesForUser = async () => {
  const { data, error } = await supabase
    .from('calendar_notes')
    .select('id, note_text, note_date');

  if (error) {
    console.error('Error fetching user notes:', error);
    throw error;
  }
  
  // We format the data to match what the calendar component expects
  return data.map(note => ({
    id: `note-${note.id}`,
    text: note.note_text,
    date: note.note_date,
    type: 'note',
    priority: 'medium'
  }));
};

/**
 * Adds a new personal note for the currently logged-in user.
 * @param {string} text - The content of the note.
 * @param {string} date - The date for the note in 'YYYY-MM-DD' format.
 * @param {string} userId - The ID of the user creating the note.
 */
export const addNoteForUser = async (text, date, userId) => {
  const { data, error } = await supabase
    .from('calendar_notes')
    .insert([{ note_text: text, note_date: date, user_id: userId }])
    .select()
    .single();

  if (error) {
    console.error('Error adding note:', error);
    throw error;
  }

  // Return the newly created note, formatted for the calendar
  return {
    id: `note-${data.id}`,
    text: data.note_text,
    date: data.note_date,
    type: 'note',
    priority: 'medium'
  };
};