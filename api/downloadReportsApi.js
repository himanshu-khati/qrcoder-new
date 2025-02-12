import { API_ENDPOINTS } from "../utils/constants.js";

export const downloadReportsApi = async (status = "", campaignId) => {
  try {
    const query = `?campaignId=${campaignId}${
      status ? `&status=${status}` : ""
    }`;
    const response = await fetch(`${API_ENDPOINTS.DOWNLOAD_REPORT}${query}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch the report. Status: ${response.status}`);
    }

    const date = new Date().toISOString().split("T")[0];

    const fileStatus = status || "all";
    const filename = `visitors_${fileStatus}_${date}.csv`;

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw error;
  }
};
