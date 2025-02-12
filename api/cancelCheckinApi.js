import { API_ENDPOINTS } from "../utils/constants.js";

export const cancelCheckIn = async (visitorId) => {
  try {
    const response = await fetch(
      API_ENDPOINTS.CANCEL_CHECKIN.replace(":id", visitorId),
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed cancel checkin");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
