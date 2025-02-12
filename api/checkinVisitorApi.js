import { API_ENDPOINTS } from "../utils/constants.js";

export const checkInVisitorApi = async (visitorId) => {
  try {
    const response = await fetch(
      API_ENDPOINTS.CHECKIN_VISITOR.replace(":id", visitorId),
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
      throw new Error(errorData.message || "Failed to check in visitor");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
