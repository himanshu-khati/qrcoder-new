import { API_ENDPOINTS } from "../utils/constants.js";

// Request password reset link
export const resetPasswordRequestApi = async (email) => {
  try {
    const response = await fetch(API_ENDPOINTS.RESET_PASSWORD_TOKEN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error(
        (await response.json()).message || "Failed to send reset link."
      );
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Reset password using token
export const resetPasswordApi = async (password, confirmPassword, token) => {
  try {
    const response = await fetch(API_ENDPOINTS.RESET_PASSWORD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, confirmPassword, token }),
    });

    if (!response.ok) {
      throw new Error(
        (await response.json()).message || "Failed to reset password."
      );
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
