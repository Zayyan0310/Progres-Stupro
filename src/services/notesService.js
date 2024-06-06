import { createNote as apiCreateNote, getAllNotes as apiGetAllNotes, getPriorityNotes as apiGetPriorityNotes, getNoteById as apiGetNoteById, updateNote as apiUpdateNote, deleteNote as apiDeleteNote } from "../api/notes";

export const createNote = async (title, description, date, status, priority) => {
  try {
    const data = await apiCreateNote(title, description, date, status, priority);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllNotes = async (title) => {
  try {
    const data = await apiGetAllNotes(title);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPriorityNotes = async () => {
  try {
    const data = await apiGetPriorityNotes();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getNoteById = async (id) => {
  try {
    const data = await apiGetNoteById(id);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateNote = async (id, title, description, date, status, priority) => {
  try {
    const data = await apiUpdateNote(id, title, description, date, status, priority);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const data = await apiDeleteNote(id);
    return data;
  } catch (error) {
    throw error;
  }
};
