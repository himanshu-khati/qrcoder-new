import { API_ENDPOINTS } from "../utils/constants.js";

export const deleteVisitorApi = async (visitorId) => {
  try {
    const response = await fetch(
      API_ENDPOINTS.SINGLE_VISITOR.replace(":id", visitorId),
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.messge || "Failed to check in visitor");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
