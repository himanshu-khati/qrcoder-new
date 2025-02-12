import { previewBulkVisitorsApi } from "./api/previewBulkVisitorsApi.js";

const bulkVisitorForm = document.getElementById("bulkVisitorForm");
const csvFileInput = document.getElementById("csvFileInput");
const urlParams = new URLSearchParams(window.location.search);
const campaignId = urlParams.get("campaignId");
import { showToast } from "./utils/toast.js";

bulkVisitorForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!csvFileInput.files || csvFileInput.files.length === 0) {
    showToast("Please select a CSV file to upload.", "danger");
    return;
  }

  const formData = new FormData();
  formData.append("file", csvFileInput.files[0]);
  if (campaignId) {
    formData.append("campaign", campaignId);
  }

  try {
    const { visitors } = await previewBulkVisitorsApi(formData);
    sessionStorage.setItem("bulkVisitors", JSON.stringify(visitors));

    const redirectUrl = campaignId
      ? `visitor-create-bulk-step2.html?campaignId=${campaignId}`
      : "visitor-create-bulk-step2.html";
    window.location.href = redirectUrl;
  } catch (error) {
    showToast(`Failed to preview visitors: ${error.message}`, "danger");
  }
});
