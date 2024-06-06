import { updateProfile as apiUpdateProfile, getProfile as apiGetProfile} from "../api/users";

export const updateProfile = async (email, newUsername, telp, bio, file) => {
  try {
    const data = await apiUpdateProfile(email, newUsername, telp, bio, file);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async (title) => {
  try {
    const data = await apiGetProfile(title);
    return data;
  } catch (error) {
    throw error;
  }
};