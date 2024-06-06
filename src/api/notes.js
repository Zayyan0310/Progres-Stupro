import API from "./index";

const addAuthorizationHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// Create a note
export const createNote = async (title, description, date, status, priority) => {
  try {
    addAuthorizationHeader();
    const response = await API.post("/notes", { title, description, date, status, priority });
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(response.data.message || "Failed to create note");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Read all notes
export const getAllNotes = async (title = "") => {
  try {
    addAuthorizationHeader();
    const encodedTitle = encodeURIComponent(title); // Encode the title for URL safety
    const response = await API.get(`/notes/${encodedTitle}`);
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(response.data.message || "Failed to fetch notes");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPriorityNotes = async () => {
  try {
    addAuthorizationHeader();
    const response = await API.get("/notes-priority");
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(response.data.message || "Failed to fetch notes");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Read a note by ID
export const getNoteById = async (id) => {
  try {
    addAuthorizationHeader();
    const response = await API.get(`/notes/${id}`);
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(response.data.message || "Failed to fetch note");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update a note
export const updateNote = async (id, title, description, date, status, priority) => {
  try {
    addAuthorizationHeader();
    const response = await API.put(`/notes/${id}`, { title, description, date, status, priority });
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(response.data.message || "Failed to update note");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a note
export const deleteNote = async (id) => {
  try {
    addAuthorizationHeader();
    const response = await API.delete(`/notes/${id}`);
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(response.data.message || "Failed to delete note");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
