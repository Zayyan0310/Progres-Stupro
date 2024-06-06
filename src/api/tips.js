import API from "./index";

export const getAllTips = async () => {
  try {
    const response = await API.get("/tips");
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(response.data.message || "Failed to fetch tips");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTipById = async (id) => {
  try {
    const response = await API.get(`/tips/${id}`);
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(response.data.message || "Failed to fetch tip");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

