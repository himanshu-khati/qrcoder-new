import { API_ENDPOINTS } from "../utils/constants.js";

export const bulkMailAndSaveVisitorsApi = async (visitors) => {
  try {
    const response = await fetch(API_ENDPOINTS.BULK_SAVE_AND_MAIL, {
      method: "POST",
      body: JSON.stringify({ visitors }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to save visitors");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
