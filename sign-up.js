import { API_ENDPOINTS } from "./utils/constants.js";
import {
  createErrorElement,
  hideError,
  showError,
} from "./utils/formErrorHandler.js";
import { showToast } from "./utils/toast.js";

document.addEventListener("DOMContentLoaded", () => {
  const emailForm = document.getElementById("email-form");
  const sendOtpButton = document.getElementById("sendOtpBtn");
  const signUpForm = document.getElementById("signup-form");
  const signupEmailField = document.getElementById("signupEmail");
  const emailInput = document.getElementById("email");
  const otpInput = document.getElementById("otp");

  const emailError = createErrorElement("emailError");
  emailInput.parentNode.insertBefore(emailError, emailInput.nextSibling);

  const signupError = createErrorElement("signupError");
  signUpForm.querySelector(".form-footer").before(signupError);

  sendOtpButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    hideError(emailError);
    if (!email) {
      showError(emailError, "Please enter a valid email address.");
      showToast("Please enter a valid email address", "danger");
      return;
    }
    try {
      const response = await fetch(API_ENDPOINTS.SEND_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send Otp");
      }
      showToast("OTP sent successfully! Check your email.", "success");
      emailForm.classList.add("hidden");
      signUpForm.classList.remove("hidden");
      signupEmailField.value = email;
    } catch (error) {
      showError(emailError, error.message);
      showToast(`${error.message}`, "danger");
    }
  });

  signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();
    const otp = otpInput.value.trim();
    hideError(signupError);
    if (!firstName || !lastName || !password || !confirmPassword || !otp) {
      showError(signupError, "All fields are required.");
      showToast("All fields are required", "danger");
      return;
    }
    if (password !== confirmPassword) {
      showError(signupError, "Passwords do not match.");
      showToast("Passwords do not match", "danger");
      return;
    }
    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          firstName,
          lastName,
          password,
          email: signupEmailField.value,
          confirmPassword,
          otp,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register");
      }
      showToast("Account created", "success");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } catch (error) {
      showError(signupError, error.message);
      showToast(`${error.message}`, "danger");
    }
  });
});
