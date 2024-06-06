const db = require("../config/db-config");
const path = require("path");
const fs = require("fs");

const getUserById = (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    res.status(400).json({
      error: true,
      message: "Invalid request. Please provide user id",
    });
    return;
  }

  db.query("SELECT * FROM users WHERE id = ?", [userId], (error, results) => {
    if (error) {
      res.status(500).json({
        error: true,
        message: "Internal server error. Cannot find user, please try again later",
      });
      console.log(error);
      return;
    }

    if (results.length === 0) {
      res.status(404).json({
        error: true,
        message: "User Not Found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: results[0],
    });
  });
};

const editProfile = (req, res) => {
  const userId = req.user.id;
  const { email, newUsername, telp, bio } = req.body;
  let updateFields = [email, newUsername, telp, bio, userId];
  let query = "UPDATE users SET email = ?, name = ?, telp = ?, bio = ? WHERE id = ?";

  if (!userId) {
    res.status(400).json({
      error: true,
      message: "Invalid request. Please provide user id",
    });
    return;
  }

  if (req.file) {
    const fileName = req.file.filename;
    const publicUrl = path.posix.join("/uploads/user_profile", fileName);

    db.query("SELECT * FROM users WHERE id = ?", [userId], (error, results) => {
      if (error) {
        res.status(500).json({
          error: true,
          message: "Internal server error. Cannot find user, please try again later",
        });
        console.log(error);
        return;
      }

      if (results.length !== 0 && results[0].image) {
        const oldFilePath = path.join(__dirname, "..", results[0].image.replace(/\//g, path.sep));
        fs.unlink(oldFilePath, (err) => {
          if (err) console.log(err);
        });
      }

      // Update query and fields to include the image
      query = "UPDATE users SET email = ?, name = ?, telp = ?, bio = ?, image = ? WHERE id = ?";
      updateFields = [email, newUsername, telp, bio, publicUrl, userId];

      db.query(query, updateFields, (error, results) => {
        if (error) {
          res.status(500).json({
            error: true,
            message: "Internal server error. Cannot update user profile, please try again later",
          });
          console.log(error);
          return;
        }

        res.status(200).json({
          status: "success",
          data: {
            email: email,
            name: newUsername,
            telp: telp,
            bio: bio,
            imageUrl: publicUrl,
          },
        });
      });
    });
  } else {
    db.query(query, updateFields, (error, results) => {
      if (error) {
        res.status(500).json({
          error: true,
          message: "Internal server error. Cannot update user profile, please try again later",
        });
        console.log(error);
        return;
      }

      res.status(200).json({
        status: "success",
        data: {
          email: email,
          name: newUsername,
          telp: telp,
          bio: bio,
        },
      });
    });
  }
};

module.exports = {
  getUserById,
  editProfile,
};
