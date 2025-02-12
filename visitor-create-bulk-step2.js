import { step2BulkUploadVisitorApi } from "./api/step2BulkUploadVisitorApi.js";
import { bulkMailAndSaveVisitorsApi } from "./api/bulkMailAndSaveVisitorsApi.js";
import { showToast } from "./utils/toast.js";

const urlParams = new URLSearchParams(window.location.search);
const campaignId = urlParams.get("campaignId");

document.addEventListener("DOMContentLoaded", () => {
  const visitors = JSON.parse(sessionStorage.getItem("bulkVisitors")) || [];
  if (!visitors.length) {
    showToast("No visitors found. Please upload a valid CSV file.", "danger");
    window.location.href = "visitor-create-bulk.html";
    return;
  }
  const tableBody = document.getElementById("previewTableBody");
  tableBody.innerHTML = visitors
    .map(
      (visitor) => `
          <tr>
            <td>${visitor.visitorName}</td>
            <td>${visitor.email}</td>
            <td>${visitor.mobile}</td>
            <td>${visitor.details}</td>
          </tr>
        `
    )
    .join("");

  const saveVisitorsBtn = document.getElementById("saveVisitorsBtn");
  const sendMailAndSaveBtn = document.getElementById("sendMailAndSave");

  const setButtonDisabled = (button, isDisabled, loadingText = null) => {
    if (button) {
      if (isDisabled) {
        button.classList.add("disabled");
        button.setAttribute("disabled", "true");
        if (loadingText) {
          button.dataset.originalText = button.innerHTML;
          button.innerHTML = `<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> ${loadingText}`;
        }
      } else {
        button.classList.remove("disabled");
        button.removeAttribute("disabled");
        if (button.dataset.originalText) {
          button.innerHTML = button.dataset.originalText;
        }
      }
    }
  };

  saveVisitorsBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    setButtonDisabled(saveVisitorsBtn, true);
    setButtonDisabled(sendMailAndSaveBtn, true);
    try {
      const response = await step2BulkUploadVisitorApi(visitors);
      if (response.success) {
        const totalVisitorsCreated = response.visitorsCreated ?? 0;
        try {
          sessionStorage.setItem(
            "totalVisitorsCreated",
            JSON.stringify(totalVisitorsCreated)
          );
        } catch (error) {
          showToast(
            `Error updating sessionStorage: ${error.message}`,
            "danger"
          );
        }
        showToast(response.message || "Visitors saved successfully", "success");
        sessionStorage.removeItem("bulkVisitors");
        const redirectUrl = campaignId
          ? `visitor-create-bulk-step3.html?campaignId=${campaignId}`
          : "visitor-create-bulk-step3.html";
        window.location.href = redirectUrl;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      showToast(`Failed to save visitors: ${error.message}`, "danger");
    }
    setButtonDisabled(saveVisitorsBtn, false);
    setButtonDisabled(sendMailAndSaveBtn, false);
  });

  sendMailAndSaveBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    setButtonDisabled(sendMailAndSaveBtn, true, "Sending Mail..");
    setButtonDisabled(saveVisitorsBtn, true);
    try {
      const response = await bulkMailAndSaveVisitorsApi(visitors);
      if (response.success) {
        const totalVisitorsCreated = response.visitorsCreated;
        sessionStorage.setItem(
          "totalVisitorsCreated",
          JSON.stringify(totalVisitorsCreated)
        );
        showToast(
          response.message || "Visitors saved and emails sent successfully!",
          "success"
        );
        sessionStorage.removeItem("bulkVisitors");
        const redirectUrl = campaignId
          ? `visitor-create-bulk-step3.html?campaignId=${campaignId}`
          : "visitor-create-bulk-step3.html";
        window.location.href = redirectUrl;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      showToast(`Failed to save and send emails: ${error.message}`, "danger");
    }
    setButtonDisabled(sendMailAndSaveBtn, false);
    setButtonDisabled(saveVisitorsBtn, false);
  });
});
