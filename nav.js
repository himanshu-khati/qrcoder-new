import { downloadReportsApi } from "./api/downloadReportsApi.js";

document.addEventListener("DOMContentLoaded", () => {
  const allVisitorsReportBtn = document.getElementById("all-visitors-report");
  const checkedInVisitorsReportBtn = document.getElementById(
    "checked-in-visitors-report"
  );
  const pendingVisitorsReportBtn = document.getElementById(
    "pending-visitors-report"
  );
  if (allVisitorsReportBtn) {
    allVisitorsReportBtn.addEventListener("click", async () => {
      try {
        await downloadReportsApi();
      } catch (error) {
        alert("Failed to download all visitors report. Please try again.");
      }
    });
  }

  if (checkedInVisitorsReportBtn) {
    checkedInVisitorsReportBtn.addEventListener("click", async () => {
      try {
        await downloadReportsApi("checked-in");
      } catch (error) {
        alert(
          "Failed to download checked-in visitors report. Please try again."
        );
      }
    });
  }
  if (pendingVisitorsReportBtn) {
    pendingVisitorsReportBtn.addEventListener("click", async () => {
      try {
        await downloadReportsApi("pending");
      } catch (error) {
        alert("Failed to download pending visitors report. Please try again.");
      }
    });
  }
});
