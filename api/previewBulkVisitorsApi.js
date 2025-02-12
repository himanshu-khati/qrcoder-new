import { API_ENDPOINTS } from "../utils/constants.js";

export const previewBulkVisitorsApi = async (formData) => {
  const response = await fetch(API_ENDPOINTS.BULK_PREVIEW_VISITORS, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to preview visitors");
  }

  return response.json();
};
