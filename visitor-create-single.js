import { createSingleVisitorApi } from "./api/createSingleVisitorApi.js";
import { createVisitorSendMailApi } from "./api/createVisitorSendMailApi.js";
import { showToast } from "./utils/toast.js";

const createVisitorForm = document.getElementById("createVisitorForm");
const saveAndSendEmailBtn = document.getElementById("saveAndSendEmailBtn");
const urlParams = new URLSearchParams(window.location.search);
const campaignId = urlParams.get("campaignId");

const gatherFormData = () => {
  const data = {
    visitorName: document.getElementById("visitorName").value.trim(),
    email: document.getElementById("visitorEmail").value.trim(),
    mobile: document.getElementById("visitorMobile").value.trim(),
    details: document.getElementById("visitorDetails").value.trim(),
  };
  if (campaignId) {
    data.campaign = campaignId;
  }

  return data;
};

const setButtonState = (clickedButton, otherButton, isLoading) => {
  if (!clickedButton || !otherButton) return;

  if (isLoading) {
    clickedButton.disabled = true;
    otherButton.disabled = true;
    clickedButton.dataset.originalText = clickedButton.innerHTML;
    clickedButton.innerHTML =
      '<span class="spinner-border me-2 spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
  } else {
    clickedButton.disabled = false;
    otherButton.disabled = false;
    clickedButton.innerHTML = clickedButton.dataset.originalText;
  }
};

const handleFormSubmit = async (withEmail) => {
  const visitorData = gatherFormData();
  if (!visitorData.visitorName || !visitorData.email || !visitorData.mobile) {
    showToast("All required fields must be filled out.", "warning");
    return;
  }
  const clickedButton = withEmail ? saveAndSendEmailBtn : saveVisitorBtn;
  const otherButton = withEmail ? saveVisitorBtn : saveAndSendEmailBtn;

  setButtonState(clickedButton, otherButton, true);
  try {
    let result;
    if (withEmail) {
      result = await createVisitorSendMailApi(visitorData);
    } else {
      result = await createSingleVisitorApi(visitorData);
    }
    showToast(result.message || "Visitor created successfully", "success");
    if (result.success) {
      window.location.href = `visitor-single.html?id=${result.visitor._id}`;
    }
  } catch (error) {
    showToast(`Failed to create visitor: ${error.message}`, "danger");
  }
  setButtonState(clickedButton, otherButton, false);
};

createVisitorForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await handleFormSubmit(false);
});

saveAndSendEmailBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  await handleFormSubmit(true);
});
