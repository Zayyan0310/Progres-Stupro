import { useState } from "react";
import { createNote as notesCreateNote, getAllNotes as notesGetAllNotes, getNoteById as notesGetNoteById, updateNote as notesUpdateNote, deleteNote as notesDeleteNote } from "../services/notesService";

const useNotes = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const createNote = async (title, description, date, status, priority) => {
    setLoading(true);
    setError(null);
    try {
      await notesCreateNote(title, description, date, status, priority);
    } catch (err) {
      const errorMessage = err.response ? err.response.data.message : err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getAllNotes = async (title) => {
    setLoading(true);
    setError(null);
    try {
      await notesGetAllNotes(title);
    } catch (err) {
      const errorMessage = err.response ? err.response.data.message : err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getNoteById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await notesGetNoteById(id);
    } catch (err) {
      const errorMessage = err.response ? err.response.data.message : err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (id, title, description, date, status, priority) => {
    setLoading(true);
    setError(null);
    try {
      await notesUpdateNote(id, title, description, date, status, priority);
    } catch (err) {
      const errorMessage = err.response ? err.response.data.message : err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await notesDeleteNote(id);
    } catch (err) {
      const errorMessage = err.response ? err.response.data.message : err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createNote, getAllNotes, getNoteById, updateNote, deleteNote, error, loading };
};

export default useNotes;
