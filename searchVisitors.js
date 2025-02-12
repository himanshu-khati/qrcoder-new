import { fetchSearchVisitors } from "./api/searchVisitorsApi.js";
import { checkInVisitorApi } from "./api/checkinVisitorApi.js";
import { cancelCheckIn } from "./api/cancelCheckinApi.js";
import { sendEmailVisitorApi } from "./api/sendEmailVisitorApi.js";
import { deleteVisitorApi } from "./api/deleteVisitorApi.js";
import { showToast } from "./utils/toast.js";
import { showConfirmModal } from "./utils/confirmModal.js";

const visitorTableBody = document.getElementById("visitorsTableBody");
const searchTitle = document.getElementById("cardTitle");

const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get("query");

if (searchTitle) {
  searchTitle.textContent = searchQuery
    ? `Search Results For "${searchQuery}"`
    : "Search Results";
}

const fetchVisitors = async () => {
  if (!searchQuery) {
    visitorTableBody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center">
          <div class="d-flex flex-column align-items-center justify-content-center p-5">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="100" height="100" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <circle cx="10" cy="10" r="7" />
              <path d="M21 21l-6 -6" />
            </svg>
            <h3 class="mt-3 text-muted">No Search Query Provided</h3>
            <p class="text-secondary">Please enter a search query to find visitors.</p>
          </div>
        </td>
      </tr>`;
    return;
  }
  try {
    const visitors = await fetchSearchVisitors(searchQuery);
    if (!visitors || visitors.length === 0) {
      visitorTableBody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center">
          <div class="d-flex flex-column align-items-center justify-content-center p-5">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="100" height="100" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <circle cx="10" cy="10" r="7" />
              <path d="M21 21l-6 -6" />
            </svg>
            <h3 class="mt-3 text-muted">No Visitors Found</h3>
            <p class="text-secondary">No Visitors Found For The Query </p>
          </div>
        </td>
      </tr>`;
      return;
    }
    renderVisitorTable(visitors);
  } catch (error) {
    showToast(`Error fetching visitors: ${error.message}`, "danger");
    visitorTableBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">${error.message}</td></tr>`;
  }
};

const renderVisitorTable = (visitors) => {
  visitorTableBody.innerHTML = visitors
    .map((visitor) => {
      const qrCode = visitor.qrcode
        ? `<img src="${visitor.qrcode}" alt="QR Code" style="width:50px">`
        : "-";
      const statusBadge = visitor.checkedIn
        ? `<span class="badge bg-success me-1"></span> Checked In 
                  <span style="font-size:12px; display: block; padding-left:14px; color:#444">
                  (${
                    visitor.checkedInAt
                      ? new Date(visitor.checkedInAt).toLocaleString()
                      : "Time not available"
                  })
                  </span>`
        : `<span class="badge bg-warning me-1"></span> Not Checked In`;

      const actions = `
        <td class="text-end">
            <span class="dropdown">
              ${
                visitor.checkedIn
                  ? `<a href="#" class="btn btn-icon btn-warning cancel-checkin-btn" data-bs-toggle="tooltip" data-bs-placement="top" title="Cancel Check In" data-visitor-id="${visitor._id}">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle-dashed-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" /><path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" /><path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" /><path d="M8.56 20.31a9 9 0 0 0 3.44 .69" /><path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" /><path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" /><path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" /><path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" /><path d="M9 12l2 2l4 -4" /></svg>
                              </a>`
                  : `
                    <a href="#" class="btn btn-icon btn-success check-in-btn" data-bs-toggle="tooltip" data-bs-placement="top" title="Check In" data-visitor-id="${visitor._id}">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" /></svg>
                              </a>
                  `
              }
        
  
              </a>
             <a href="./visitor-single.html?id=${
               visitor._id
             }" class="btn btn-icon btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Visitor">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                              </a>
  
               <a href="#" class="btn btn-icon btn-info send-email-btn" data-bs-toggle="tooltip" data-bs-placement="top" data-visitor-id="${
                 visitor._id
               }" title="Send Email">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-mail-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 19h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v5.5" /><path d="M19 22v-6" /><path d="M22 19l-3 -3l-3 3" /><path d="M3 7l9 6l9 -6" /></svg>
                              </a>
  
             <a href="#" class="btn btn-icon btn-danger delete-visitor-btn" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Visitor" data-visitor-id="${
               visitor._id
             }" >
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-trash-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" /></svg>
                              </a>
            </span>
          </td>
          `;

      return `
          <tr>
            <td>${visitor.serial ?? "-"}</td>
            <td>${visitor.visitorName}</td>
            <td>${visitor.email}</td>
            <td>${visitor.mobile ?? "-"}</td>
            <td>${visitor.details ?? "-"}</td>
            <td>${qrCode}</td>
            <td>${statusBadge}</td>
            ${actions}
          </tr>
        `;
    })
    .join("");

  initializeTooltips();
  attachActionHandlers();
};

const attachActionHandlers = () => {
  const checkInButtons = document.querySelectorAll(".check-in-btn");
  const cancelCheckInButtons = document.querySelectorAll(".cancel-checkin-btn");
  const sendEmailButtons = document.querySelectorAll(".send-email-btn");
  const deleteVisitorButtons = document.querySelectorAll(".delete-visitor-btn");

  const setLoadingState = (button, isLoading) => {
    if (isLoading) {
      button.disabled = true;
      button.isProcessing = true;
      button.innerHTML = `
        <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> `;
    } else {
      button.disabled = false;
      button.isProcessing = false;
      button.innerHTML = button.dataset.originalHtml;
    }
  };

  //  check-in
  checkInButtons.forEach((button) => {
    button.dataset.originalHtml = button.innerHTML;
    button.isProcessing = false;
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      if (button.isProcessing) return;
      const visitorId = button.getAttribute("data-visitor-id");
      setLoadingState(button, true);
      try {
        const result = await checkInVisitorApi(visitorId);
        if (result.success) {
          showToast(
            result.message || "Visitor checked in successfully",
            "success"
          );

          fetchVisitors();
        }
      } catch (error) {
        showToast(`Failed to check in visitor: ${error.message}`, "danger");
      }
      setLoadingState(button, false);
    });
  });

  //   cancel check-in
  cancelCheckInButtons.forEach((button) => {
    button.dataset.originalHtml = button.innerHTML;
    button.isProcessing = false;
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      if (button.isProcessing) return;
      const visitorID = button.getAttribute("data-visitor-id");
      setLoadingState(button, true);
      try {
        const result = await cancelCheckIn(visitorID);
        if (result.success) {
          showToast(
            result.message || "Visitor check-in canceled successfully!",
            "success"
          );
          fetchVisitors();
        }
      } catch (error) {
        showToast(`Failed to cancel check-in: ${error.message}`, "danger");
      }
      setLoadingState(button, false);
    });
  });

  //   send email
  sendEmailButtons.forEach((button) => {
    button.dataset.originalHtml = button.innerHTML;
    button.isProcessing = false;
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      if (button.isProcessing) return;
      const visitorId = button.getAttribute("data-visitor-id");
      setLoadingState(button, true);
      try {
        const result = await sendEmailVisitorApi(visitorId);
        if (result.success) {
          showToast(result.message || "email sen successfully", "success");
        }
      } catch (error) {
        showToast(`Failed to send email: ${error.message} `, "danger");
      }
      setLoadingState(button, false);
    });
  });

  //   delete visitor
  deleteVisitorButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const visitorId = button.getAttribute("data-visitor-id");
      showConfirmModal({
        title: "Confirm Deletion",
        message:
          "Are you sure you want to delete this visitor? This action cannot be undone.",
        onConfirm: async () => {
          try {
            const result = await deleteVisitorApi(visitorId);
            if (result.success) {
              showToast(
                result.message || "Visitor Deleted successfully",
                "success"
              );
              fetchVisitors();
            }
          } catch (error) {
            showToast(`Failed to delete visitor: ${error.message}`, "danger");
          }
        },
      });
    });
  });
};

const initializeTooltips = () => {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach((tooltipTriggerEl) => {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  fetchVisitors();
});
