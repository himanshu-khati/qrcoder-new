import { API_ENDPOINTS } from "./utils/constants.js";
import { showToast } from "./utils/toast.js";

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", async (e) => {
      e.preventDefault();

      try {
        const response = await fetch(API_ENDPOINTS.LOGOUT, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) throw new Error("Logout failed");

        const data = await response.json();

        if (data.success) {
          document.cookie =
            "session=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie =
            "authToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          localStorage.clear();
          sessionStorage.clear();

          showToast("Logged out successfully", "success");

          setTimeout(() => {
            window.location.href = "sign-in.html";
          }, 500);
        } else {
          showToast(data.message || "Failed to logout", "danger");
        }
      } catch (error) {
        showToast(`Logout error: ${error.message}`, "danger");
      }
    });
  }
});
