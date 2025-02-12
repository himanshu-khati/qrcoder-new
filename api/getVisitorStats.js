import { API_ENDPOINTS } from "../utils/constants.js";

export const getVisitorStats = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.DASHBOARD_STATS, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "failed to get dashboard data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
