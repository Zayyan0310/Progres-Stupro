import API from "./index";

const addAuthorizationHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export const updateProfile = async (email, newUsername, telp, bio, file) => {
  try {
    addAuthorizationHeader();
    // API.defaults.headers.common["Content-Type"] = "multipart/form-data";

    const formData = new FormData();
    formData.append("email", email);
    formData.append("newUsername", newUsername);
    formData.append("telp", telp);
    formData.append("bio", bio);
    if (file) {
      formData.append("file", file);
    }

    const response = await API.post("/user", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(response.data.message || "Failed to update profile");
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async () => {
  try {
    addAuthorizationHeader();
    const response = await API.get("/user");
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(response.data.message || "Failed to fetch profile");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
