import { resetPasswordRequestApi } from "./api/resetPasswordApi.js";
import { showToast } from "./utils/toast.js";

document.addEventListener("DOMContentLoaded", () => {
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  const emailInput = document.getElementById("emailInput");
  const resetPasswordBtn = document.getElementById("resetPasswordBtn");
  const resetBtnText = document.getElementById("resetBtnText");

  if (
    !forgotPasswordForm ||
    !emailInput ||
    !resetPasswordBtn ||
    !resetBtnText
  ) {
    return;
  }

  forgotPasswordForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();

    if (!email) {
      showToast("Please enter your email address.", "danger");
      return;
    }

    resetPasswordBtn.disabled = true;
    resetBtnText.textContent = "Sending...";

    try {
      const response = await resetPasswordRequestApi(email);

      if (!response || !response.success) {
        throw new Error(response?.message || "Failed to send reset link.");
      }

      showToast(
        response.message || "Password reset link sent successfully!",
        "success"
      );
      resetBtnText.textContent = "Sent! Check Email";
      setTimeout(() => {
        window.location.assign("sign-in.html");
      }, 3000);
    } catch (error) {
      console.error("Error sending reset link:", error.message);
      showToast(error.message || "Failed to send reset link.", "danger");
      resetPasswordBtn.disabled = false;
      resetBtnText.textContent = "Send Reset Link";
    }
  });
});
