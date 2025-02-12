import { API_ENDPOINTS } from "../utils/constants.js";

export const getAllCampaigns = async (page = 1, limit = 10) => {
  try {
    let url = `${API_ENDPOINTS.GET_ALL_CAMPAIGN}?page=${page}&limit=${limit}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "failed to fetch campaigns");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getSingleCampaign = async (campaignId) => {
  try {
    const response = await fetch(
      API_ENDPOINTS.SINGLE_CAMPAIGN.replace(":campaignId", campaignId),
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
      throw new Error(errorData.messge || "Failed to get campaign details");
    }
    const data = await response.json();
    return data.campaign;
  } catch (error) {
    throw error;
  }
};

export const updateCampaign = async (campaignId, updatedData) => {
  try {
    const response = await fetch(
      API_ENDPOINTS.SINGLE_CAMPAIGN.replace(":campaignId", campaignId),
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
      throw new Error(errorData.message || "Failed to update campaign");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteCampaign = async (campaignId) => {
  try {
    const response = await fetch(
      API_ENDPOINTS.SINGLE_CAMPAIGN.replace(":campaignId", campaignId),
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
      throw new Error(errorData.message || "Failed to delete campaign");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
