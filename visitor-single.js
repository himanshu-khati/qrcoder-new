import { getSingleVisitorApi } from "./api/getSingleVisitorApi.js";
import { updateVisitorDetailsApi } from "./api/updateVisitorDetails.js";
import { cancelCheckIn } from "./api/cancelCheckinApi.js";
import { checkInVisitorApi } from "./api/checkinVisitorApi.js";
import { deleteVisitorApi } from "./api/deleteVisitorApi.js";
import { sendEmailVisitorApi } from "./api/sendEmailVisitorApi.js";
import { showToast } from "./utils/toast.js";
import { showConfirmModal } from "./utils/confirmModal.js";

const visitorId = new URLSearchParams(window.location.search).get("id");
let actualVisitorId = null;

const setButtonDisabled = (button, isDisabled) => {
  if (button) {
    if (isDisabled) {
      button.classList.add("disabled");
      button.setAttribute("disabled", "true");
    } else {
      button.classList.remove("disabled");
      button.removeAttribute("disabled");
    }
  }
};

const populateVisitorDetails = (visitor) => {
  document.getElementById("visitorSerial").textContent = visitor.serial ?? "-";
  document.getElementById("visitorQrCode").src =
    visitor.qrcode ?? "./dist/img/qrcode.png";
  document.getElementById("visitorName").value = visitor.visitorName ?? "";
  document.getElementById("visitorEmail").value = visitor.email ?? "";
  document.getElementById("visitorMobile").value = visitor.mobile ?? "";
  document.getElementById("visitorDetails").value = visitor.details ?? "";

  const buttonContainer = document.getElementById("checkInButtonContainer");
  buttonContainer.innerHTML = visitor.checkedIn
    ? `<a
        href="#"
        class="btn btn-warning cancel-checkin-btn"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Cancel Check In"
        id = "cancelCheckinBtn" 
        data-visitor-id="${visitor._id}"
        
      >
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-dashed-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" /><path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" /><path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" /><path d="M8.56 20.31a9 9 0 0 0 3.44 .69" /><path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" /><path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" /><path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" /><path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" /><path d="M9 12l2 2l4 -4" /></svg>
        Cancel Check In
     </a>`
    : `<a
      href="#"
      class="btn btn-success check-in-btn"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Check In"
      id="checkInBtn"
      data-visitor-id="${visitor._id}"
    >
         <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" /></svg>
         Check In
     </a>`;
  attachDynamicButtonHandlers();
};

const fetchVisitorDetails = async () => {
  try {
    const visitor = await getSingleVisitorApi(visitorId);
    populateVisitorDetails(visitor);
    actualVisitorId = visitor._id;
  } catch (error) {
    showToast(`Failed to load visitor details: ${error.message}`, "danger");
  }
};

const attachDynamicButtonHandlers = () => {
  const checkinBtn = document.querySelector(".check-in-btn");
  const cancelCheckinBtn = document.querySelector(".cancel-checkin-btn");

  if (checkinBtn) {
    checkinBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      if (checkinBtn.disabled) return;
      setButtonDisabled(checkinBtn, true);
      try {
        const result = await checkInVisitorApi(actualVisitorId);
        showToast(
          result.message || "Visitor checked in successfully",
          "success"
        );
        await fetchVisitorDetails();
      } catch (error) {
        showToast(`Failed to check in: ${error.message}`, "danger");
      }
      setButtonDisabled(checkinBtn, false);
    });
  }
  if (cancelCheckinBtn) {
    cancelCheckinBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      if (cancelCheckinBtn.isProcessing) return;
      setButtonDisabled(cancelCheckinBtn, true);
      try {
        const result = await cancelCheckIn(actualVisitorId);
        showToast(
          result.message || "Check-in canceled successfully",
          "success"
        );
        await fetchVisitorDetails();
      } catch (error) {
        showToast(`Failed to cancel check-in: ${error.message}`, "danger");
      }
      setButtonDisabled(cancelCheckinBtn, false);
    });
  }
};

document
  .getElementById("editVisitorForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = event.target.querySelector("button[type='submit']");
    if (submitButton.disabled) return;
    setButtonDisabled(submitButton, true);
    const updatedData = {
      visitorName: document.getElementById("visitorName").value,
      email: document.getElementById("visitorEmail").value,
      mobile: document.getElementById("visitorMobile").value,
      details: document.getElementById("visitorDetails").value,
    };
    try {
      const result = await updateVisitorDetailsApi(
        actualVisitorId,
        updatedData
      );
      showToast(
        result.message || "Visitor details updated successfully",
        "success"
      );
    } catch (error) {
      showToast(`Failed to update visitor details: ${error.message}`, "danger");
    }
    setButtonDisabled(submitButton, false);
  });

document
  .getElementById("sendEmailBtn")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    const button = event.target;
    if (button.disabled) return;
    setButtonDisabled(button, true);
    try {
      const result = await sendEmailVisitorApi(actualVisitorId);
      showToast(result.message || "mail sent successfully", "success");
      await fetchVisitorDetails();
    } catch (error) {
      showToast(`Failed to send visitor email: ${error.message}`, "danger");
    }
    setButtonDisabled(button, false);
  });

document
  .getElementById("deleteVisitorBtn")
  .addEventListener("click", async () => {
    showConfirmModal({
      title: "Confirm Deletion",
      message:
        "Are you sure you want to delete this visitor? This action cannot be undone.",
      onConfirm: async () => {
        try {
          const result = await deleteVisitorApi(actualVisitorId);
          showToast(
            result.message || "visitor deleted successfully",
            "success"
          );
          window.location.href = "index.html";
        } catch (error) {
          showToast(`Failed to delete visitor: ${error.message}`, "danger");
        }
      },
    });
  });

document.addEventListener("DOMContentLoaded", fetchVisitorDetails);
