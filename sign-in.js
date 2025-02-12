import { API_ENDPOINTS } from "./utils/constants.js";
import {
  createErrorElement,
  hideError,
  showError,
} from "./utils/formErrorHandler.js";
import { showToast } from "./utils/toast.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const signInError = createErrorElement("signInError");
  loginForm.querySelector(".form-footer").before(signInError);

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError(signInError);
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      showError(signInError, "All fields are required");
      showToast("All fields are required", "danger");
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to log in");
      }

      const data = await response.json();
      showToast(`${data.message}!`, "success");
      window.location.href = "./index.html";
    } catch (error) {
      showError(signInError, error.message);
      showToast(`${error.message}`, "danger");
    }
  });
});
