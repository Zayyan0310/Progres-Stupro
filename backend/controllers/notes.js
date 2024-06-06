const db = require("../config/db-config");

const getNotes = (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    res.status(400).json({
      error: true,
      message: "Invalid request.",
    });
    return;
  }

  db.query("SELECT * FROM notes WHERE user_id = ? ORDER BY date ASC, priority DESC", [userId], (error, results) => {
    if (error) {
      res.status(500).json({
        error: true,
        message: "Internal server error.",
      });
      console.log(error);
      return;
    }

    res.status(200).json({
      status: "success",
      data: results,
    });
  });
};

const getNotesPriority = (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    res.status(400).json({
      error: true,
      message: "Invalid request.",
    });
    return;
  }

  db.query("SELECT * FROM notes WHERE user_id = ? AND status != 'Selesai' ORDER BY priority DESC, date ASC", [userId], (error, results) => {
    if (error) {
      res.status(500).json({
        error: true,
        message: "Internal server error.",
      });
      console.log(error);
      return;
    }

    res.status(200).json({
      status: "success",
      data: results,
    });
  });
};

const searchNotes = (req, res) => {
  const { title } = req.params;
  const userId = req.user.id;

  if (!userId) {
    res.status(400).json({
      error: true,
      message: "Invalid request.",
    });
    return;
  }

  db.query("SELECT * FROM notes WHERE title Like ? AND user_id = ?", [`%${title}%`, userId], (error, results) => {
    if (error) {
      res.status(500).json({
        error: true,
        message: "Internal server error.",
      });
      console.log(error);
      return;
    }

    res.status(200).json({
      status: "success",
      data: results,
    });
  });
};

const getNotesById = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  if (!userId) {
    res.status(400).json({
      error: true,
      message: "Invalid request.",
    });
    return;
  }

  db.query("SELECT * FROM notes WHERE id = ? AND user_id = ?", [id, userId], (error, results) => {
    if (error) {
      res.status(500).json({
        error: true,
        message: "Internal server error.",
      });
      console.log(error);
      return;
    }

    if (results.length === 0) {
      res.status(404).json({
        error: true,
        message: "Note Not Found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: results[0],
    });
  });
};

const getNotesByStatus = (req, res) => {
  const { status } = req.params;
  const userId = req.user.id;

  if (!userId) {
    res.status(400).json({
      error: true,
      message: "Invalid request.",
    });
    return;
  }

  db.query("SELECT * FROM notes WHERE status = ? AND user_id = ?", [status, userId], (error, results) => {
    if (error) {
      res.status(500).json({
        error: true,
        message: "Internal server error.",
      });
      console.log(error);
      return;
    }

    res.status(200).json({
      status: "success",
      data: results[0],
    });
  });
};

const createNote = (req, res) => {
  const userId = req.user.id;
  const { title, description, date, status, priority } = req.body;

  if (!userId) {
    return res.status(400).json({
      error: true,
      message: "Invalid request.",
    });
  }

  const newNote = { title, description, date, status, priority, user_id: userId };

  db.query("INSERT INTO notes SET ?", newNote, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error: true,
        message: "Internal server error.",
      });
    }

    res.status(201).json({
      status: "success",
      data: { id: results.insertId, ...newNote },
    });
  });
};

const editNote = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { title, description, date, status, priority } = req.body;

  if (!userId) {
    return res.status(400).json({
      error: true,
      message: "Invalid request.",
    });
  }

  const updatedNote = { title, description, date, status, priority };

  db.query("UPDATE notes SET ? WHERE id = ? AND user_id = ?", [updatedNote, id, userId], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error: true,
        message: "Internal server error.",
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        error: true,
        message: "Note Not Found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Note updated successfully",
    });
  });
};

const deleteNote = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({
      error: true,
      message: "Invalid request.",
    });
  }

  db.query("DELETE FROM notes WHERE id = ? AND user_id = ?", [id, userId], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error: true,
        message: "Internal server error.",
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        error: true,
        message: "Note Not Found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Note deleted successfully",
    });
  });
};

module.exports = {
  getNotes,
  getNotesPriority,
  getNotesById,
  getNotesByStatus,
  searchNotes,
  createNote,
  editNote,
  deleteNote,
};
