const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const tipsController = require("../controllers/tips");
const notesController = require("../controllers/notes");
const { multerConfig } = require("../config/storage-config");

//Authentication
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/logout", checkAuth, authController.logout);
router.post("/auth/forgot-pass", authController.forgotPassword);
router.put("/auth/reset-pass", authController.resetPassword);
router.put("/auth/change-pass", checkAuth, authController.changePassword);

//User
router.get("/user", checkAuth, userController.getUserById);
router.post("/user", checkAuth, multerConfig, userController.editProfile);

//Tips
router.get("/tips", tipsController.getTips);
router.get("/tips/:id", tipsController.getTipsById);

//Notes
// router.get("/notes/:id", checkAuth, notesController.getNotesById);
router.get("/notes/status/:status", checkAuth, notesController.getNotesByStatus);
router.get("/notes", checkAuth, notesController.getNotes);
router.get("/notes-priority", checkAuth, notesController.getNotesPriority);
router.get("/notes/:title", checkAuth, notesController.searchNotes);
router.post("/notes", checkAuth, notesController.createNote);
router.put("/notes/:id", checkAuth, notesController.editNote);
router.delete("/notes/:id", checkAuth, notesController.deleteNote);

module.exports = router;
