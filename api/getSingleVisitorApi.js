import { API_ENDPOINTS } from "../utils/constants.js";

export const getSingleVisitorApi = async (visitorId) => {
  try {
    const response = await fetch(
      API_ENDPOINTS.SINGLE_VISITOR.replace(":id", visitorId),
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
      throw new Error(errorData.messge || "Failed to get visitor details");
    }
    const data = await response.json();
    return data.visitor;
  } catch (error) {
    throw error;
  }
};
