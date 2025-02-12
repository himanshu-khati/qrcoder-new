import { API_ENDPOINTS } from "../utils/constants.js";

export const createSingleVisitorApi = async (visitorData) => {
  try {
    const response = await fetch(API_ENDPOINTS.CREATE_VISITOR, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visitorData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to vreate visitor");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
