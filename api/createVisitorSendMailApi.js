import { API_ENDPOINTS } from "../utils/constants.js";

export const createVisitorSendMailApi = async (visitorData) => {
  try {
    const response = await fetch(API_ENDPOINTS.CREATE_VISITOR_SEND_MAIL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visitorData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to create visitor or send email"
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
