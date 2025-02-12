import { API_ENDPOINTS } from "../utils/constants.js";

export const createCampaignApi = async (campaignData) => {
  try {
    const response = await fetch(API_ENDPOINTS.CREATE_CAMPAIGN, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(campaignData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create campaign");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
