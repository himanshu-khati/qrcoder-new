import { resetPasswordApi } from "./api/resetPasswordApi.js";
import { showToast } from "./utils/toast.js";

document.addEventListener("DOMContentLoaded", () => {
  const resetForm = document.getElementById("resetPasswordForm");
  const resetPasswordBtn = document.getElementById("resetPasswordBtn");
  const tokenInput = document.getElementById("resetToken");

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  if (!token) {
    showToast("Invalid or missing token. Redirecting to login page.", "danger");
    window.location.href = "sign-in.html";
    return;
  }

  tokenInput.value = token;

  if (!resetForm) {
    console.error("Reset form not found!");
    return;
  }

  resetForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const password = document.getElementById("newPassword").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();

    if (!password || !confirmPassword) {
      showToast("Please fill in all fields.", "danger");
      return;
    }

    if (password.length < 6) {
      showToast("Password must be at least 6 characters long.", "danger");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match.", "danger");
      return;
    }
    resetPasswordBtn.disabled = true;
    resetPasswordBtn.innerText = "Resetting...";

    try {
      const response = await resetPasswordApi({
        password,
        confirmPassword,
        token,
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to reset password.");
      }

      showToast(response.message, "success");
      setTimeout(() => {
        window.location.href = "sign-in.html";
      }, 3000);
    } catch (error) {
      showToast(error.message, "danger");
    } finally {
      resetPasswordBtn.disabled = false;
      resetPasswordBtn.innerText = "Reset Password";
    }
  });
});
