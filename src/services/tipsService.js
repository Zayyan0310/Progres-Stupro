import { getAllTips as apiGetAllTips, getTipById as apiGetTipById } from "../api/tips";

export const getAllTips = async (title) => {
  try {
    const data = await apiGetAllTips(title);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getTipById = async (id) => {
  try {
    const data = await apiGetTipById(id);
    return data;
  } catch (error) {
    throw error;
  }
};
