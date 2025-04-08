import { API_ENDPOINTS } from "./utils/constants.js";

export const checkAuth = async () => {
  const loader = document.getElementById("auth-loader");
  const mainApp = document.getElementById("main-app");
  const logoutButton = document.getElementById("logoutButton");

  const currentPath = window.location.pathname;
  let currentFile = currentPath.split("/").pop();

  if (!currentFile) {
    currentFile = "index.html";
  }
  const PUBLIC_FILES = [
    "sign-in.html",
    "sign-up.html",
    "forgot-password.html",
    "reset-password.html",
  ];

  const isPublicPage = PUBLIC_FILES.includes(currentFile);

  try {
    const response = await fetch(API_ENDPOINTS.CHECK_AUTH, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();

    if (data.success) {
      if (logoutButton) {
        logoutButton.classList.remove("d-none");
        logoutButton.classList.add("d-flex");
      }
      loader?.classList.add("d-none");
      mainApp?.classList.remove("d-none");
    } else {
      if (!isPublicPage) {
        window.location.href = "sign-in.html";
      } else {
        loader?.classList.add("d-none");
      }
    }
  } catch (error) {
    console.error("checkAuth error:", error);

    if (!isPublicPage) {
      window.location.href = "sign-in.html";
    } else {
      loader?.classList.add("d-none");
    }
  }
};

document.addEventListener("DOMContentLoaded", checkAuth);
