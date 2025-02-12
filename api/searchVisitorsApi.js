import { API_ENDPOINTS } from "../utils/constants.js";
export const fetchSearchVisitors = async (query) => {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.SEARCH_VISITORS}?query=${encodeURIComponent(query)}`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to fetch search results");
    }
    return data.visitors;
  } catch (error) {
    return [];
  }
};
