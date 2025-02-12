import { createCampaignApi } from "./api/createCampaignApi.js";
import { showToast } from "./utils/toast.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createCampaignForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const campaignName = document.getElementById("campaignName").value.trim();
    const description = document
      .getElementById("campaignDescription")
      .value.trim();
    if (!campaignName || !description) {
      showToast("All fields are required.", "danger");
      return;
    }
    try {
      const response = await createCampaignApi({ campaignName, description });
      if (response.success) {
        showToast(
          response.message || "Campaign created successfully",
          "success"
        );
        window.location.href = `campaign-edit.html?campaignId=${response.campaign._id}`;
      } else {
        throw new Error(response.message || "Failed to create campaign");
      }
    } catch (error) {
      showToast(`Error creating campaign: ${error.message}`, "danger");
    }
  });
});
