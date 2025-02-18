// Settup axiosIntance

import axios from "axios";

const authAPI = () => {};
const API_BASE_URL = ""


export const loginUser = async (userData) => {
    try {
      const response = await axios.post(
      `${API_BASE_URL}/login`,
        userData,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.Errors ||
        error.response?.data?.Message ||
        "An error occurred"
      );
    }
  };