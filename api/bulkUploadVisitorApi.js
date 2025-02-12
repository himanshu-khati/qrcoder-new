import { API_ENDPOINTS } from "../utils/constants.js";

export const bulkUploadVisitorsApi = async (formData) => {
  try {
    const response = await fetch(API_ENDPOINTS.BULK_UPLOAD_VISITORS, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Bulk upload failed.");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
