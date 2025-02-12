import { API_ENDPOINTS } from "../utils/constants.js";

export const step2BulkUploadVisitorApi = async (visitors) => {
  try {
    const response = await fetch(API_ENDPOINTS.STEP2_BULK_UPLOAD, {
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
    return response.json();
  } catch (error) {
    throw error;
  }
};
