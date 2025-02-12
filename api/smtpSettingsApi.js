import { API_ENDPOINTS } from "../utils/constants.js";

// save settings
export const saveSmtpSettingsApi = async (settingsData) => {
  try {
    const response = await fetch(API_ENDPOINTS.SMTP_SETTINGS, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settingsData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to save settings");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// get settings
export const getSmtpSettings = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.SMTP_SETTINGS, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "failed to get settings");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("Error fetching SMTP settings:", error.message);
    throw error;
  }
};
