import { API_ENDPOINTS } from "../utils/constants.js";

export const updateVisitorDetailsApi = async (visitorId, updatedData) => {
  try {
    const response = await fetch(
      API_ENDPOINTS.SINGLE_VISITOR.replace(":id", visitorId),
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.messge || "Failed to update visitor details");
    }
    const data = await response.json();
    return data.visitor;
  } catch (error) {
    throw error;
  }
};
