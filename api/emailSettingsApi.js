import { API_ENDPOINTS } from "../utils/constants.js";

export const getEmailSettings = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.EMAIL_SETTINGS, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch email settings.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Save email settings for the current user.
 * @param {Object} settings - The email settings to save.
 * @param {string} settings.subject - The email subject.
 * @param {string} settings.body - The email body.
 */

export const saveEmailSettingsApi = async (settings) => {
  try {
    const response = await fetch(API_ENDPOINTS.EMAIL_SETTINGS, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to save email settings.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
