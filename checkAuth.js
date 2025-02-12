import { API_ENDPOINTS } from "./utils/constants.js";
export const checkAuth = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.CHECK_AUTH, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    const logoutButton = document.getElementById("logoutButton");
    //hk
    const currentPath = window.location.pathname;
    const isPublicPage =
      currentPath.includes("sign-in.html") ||
      currentPath.includes("sign-up.html") ||
      currentPath.includes("forgot-password.html") ||
      currentPath.includes("reset-password.html");

    if (data.success) {
      if (isPublicPage) {
        window.location.href = "index.html";
        return;
      }
      // if (
      //   window.location.pathname.includes("sign-in.html") ||
      //   window.location.pathname.includes("sign-up.html")
      // ) {
      //   window.location.href = "index.html";
      // }
      if (logoutButton) {
        logoutButton.classList.remove("d-none");
        logoutButton.classList.add("d-flex");
      }
    } else {
      if (logoutButton) {
        logoutButton.classList.remove("d-flex");
        logoutButton.classList.add("d-none");
      }
      if (!isPublicPage) {
        window.location.href = "sign-in.html";
      }
      // if (!window.location.pathname.includes("sign-in.html")) {
      //   window.location.href = "sign-in.html";
      // }
    }
  } catch (error) {
    // console.error("Auth check failed:", error);
    const currentPath = window.location.pathname;
    const isPublicPage =
      currentPath.includes("sign-in.html") ||
      currentPath.includes("sign-up.html");

    if (!isPublicPage) {
      window.location.href = "sign-in.html";
    }

    // if (!window.location.pathname.includes("sign-in.html")) {
    //   window.location.href = "sign-in.html";
    // }
  }
};

document.addEventListener("DOMContentLoaded", checkAuth);
