import { API_ENDPOINTS } from "../utils/constants.js";

export const fetchVisitorsApi = async (
  page = 1,
  limit = 10,
  campaignId = null
) => {
  try {
    let url = `${API_ENDPOINTS.ALL_VISITORS}?page=${page}&limit=${limit}`;
    if (campaignId) {
      url += `&campaign=${campaignId}`;
    }
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "failed to get visitors");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
