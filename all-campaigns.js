import { getAllCampaigns, deleteCampaign } from "./api/campaignApis.js";
import { showConfirmModal } from "./utils/confirmModal.js";
import { showToast } from "./utils/toast.js";
const campaignTableBody = document.getElementById("campaignTableBody");
const startEntry = document.getElementById("startEntry");
const endEntry = document.getElementById("endEntry");
const totalEntries = document.getElementById("totalEntries");
const paginationControls = document.getElementById("paginationControls");

let currentPage = 1;
let totalPages = 1;
const pageSize = 10;

const fetchCampaigns = async (page = 1) => {
  try {
    const { campaigns, pagination } = await getAllCampaigns(page, pageSize);
    currentPage = pagination.currentPage;
    totalPages = pagination.totalPages;

    startEntry.textContent =
      totalPages === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    endEntry.textContent =
      totalPages === 0
        ? 0
        : Math.min(currentPage * pageSize, pagination.totalItems);
    totalEntries.textContent = pagination.totalItems;

    renderCampaignTable(campaigns);
    renderPaginationControls();
  } catch (error) {
    showToast(`Error fething campaigns: ${error.message}`, "danger");
    campaignTableBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">${error.message}</td></tr>`;
  }
};

const renderCampaignTable = (campaigns) => {
  if (!campaigns || campaigns.length === 0) {
    campaignTableBody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center">
          <div class="d-flex flex-column align-items-center justify-content-center p-5">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users" width="100" height="100" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <circle cx="9" cy="7" r="4" />
              <path d="M3 21v-2a4 4 0 0 1 4 -4h4" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              <path d="M16 21v-2a4 4 0 0 0 -3 -3.85" />
            </svg>
            <h3 class="mt-3 text-muted">No Campaigns Found</h3>
            <p class="text-secondary">Start adding Campaigns to see them here.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }
  campaignTableBody.innerHTML = campaigns
    .map(
      (campaign) => `
          <tr>
            <td>${campaign._id}</td>
            <td>
              <a href="campaign-edit.html?campaignId=${campaign._id}">
                ${campaign.campaignName}
              </a>
            </td>
            <td>${campaign.visitors.length}</td>
            <td>${new Date(campaign.createdAt).toLocaleString()}</td>
            <td>${new Date(campaign.updatedAt).toLocaleString()}</td>
            <td class="text-end">
              <a href="campaign-edit.html?campaignId=${
                campaign._id
              }" class="btn btn-icon btn-secondary" data-bs-toggle="tooltip" title="Edit Campaign">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                                        <path d="M16 5l3 3" />
                                                    </svg>
              </a>
              <button class="btn btn-icon btn-danger delete-campaign-btn" data-campaign-id="${
                campaign._id
              }" title="Delete Campaign" data-bs-placement="top" data-bs-toggle="tooltip" >
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M4 7h16" />
                                                        <path d="M10 11v6" />
                                                        <path d="M14 11v6" />
                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                        <path d="M9 7v-2a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v2" />
                                                    </svg>
              </button>
            </td>
          </tr>`
    )
    .join("");
  initializeTooltips();
  attachDeleteHandlers();
};

const renderPaginationControls = () => {
  paginationControls.innerHTML = "";
  if (totalPages === 0) return;
  const maxNumbersToShow = 5;
  const startPage =
    Math.floor((currentPage - 1) / maxNumbersToShow) * maxNumbersToShow + 1;
  const endPage = Math.min(startPage + maxNumbersToShow - 1, totalPages);

  const prevButton = document.createElement("li");
  prevButton.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prevButton.innerHTML = `<a class="page-link" href="#">Previous</a>`;
  prevButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) fetchCampaigns(currentPage - 1);
  });
  paginationControls.appendChild(prevButton);

  if (startPage > 1) {
    const ellipsisBefore = document.createElement("li");
    ellipsisBefore.className = "page-item";
    ellipsisBefore.innerHTML = `<a class="page-link" href="#">...</a>`;
    ellipsisBefore.addEventListener("click", (e) => {
      e.preventDefault();
      fetchCampaigns(startPage - 1);
    });
    paginationControls.appendChild(ellipsisBefore);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageItem = document.createElement("li");
    pageItem.className = `page-item ${i === currentPage ? "active" : ""}`;
    pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    pageItem.addEventListener("click", (e) => {
      e.preventDefault();
      fetchCampaigns(i);
    });
    paginationControls.appendChild(pageItem);
  }

  if (endPage < totalPages) {
    const ellipsisAfter = document.createElement("li");
    ellipsisAfter.className = "page-item";
    ellipsisAfter.innerHTML = `<a class="page-link" href="#">...</a>`;
    ellipsisAfter.addEventListener("click", (e) => {
      e.preventDefault();
      fetchCampaigns(endPage + 1);
    });
    paginationControls.appendChild(ellipsisAfter);
  }

  const nextButton = document.createElement("li");
  nextButton.className = `page-item ${
    currentPage === totalPages ? "disabled" : ""
  }`;
  nextButton.innerHTML = `<a class="page-link" href="#">Next</a>`;
  nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) fetchCampaigns(currentPage + 1);
  });
  paginationControls.appendChild(nextButton);
};

const attachDeleteHandlers = () => {
  const deleteButtons = document.querySelectorAll(".delete-campaign-btn");
  deleteButtons.forEach((button) =>
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const campaignId = button.dataset.campaignId;

      showConfirmModal({
        title: "Confirm Deletion",
        message:
          "Are you sure you want to delete this campaign? This action cannot be undone.",
        onConfirm: async () => {
          try {
            const response = await deleteCampaign(campaignId);
            if (response.success) {
              showToast("Campaign deleted successfully.", "success");
              fetchCampaigns();
            }
          } catch (error) {
            showToast(`Failed to delete campaign: ${error.message}`, "danger");
          }
        },
      });
    })
  );
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
  fetchCampaigns();
});
