import { useState } from "react";
import { updateProfile as serviceUpdateProfile } from "../services/userService";

const useNotes = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateProfile = async (email, newUsername, telp, bio, file) => {
    setLoading(true);
    setError(null);
    try {
      await serviceUpdateProfile(email, newUsername, telp, bio, file);
    } catch (err) {
      const errorMessage = err.response ? err.response.data.message : err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, error, loading };
};

export default useNotes;
