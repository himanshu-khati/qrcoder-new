import { API_ENDPOINTS } from "./utils/constants.js";
import {
  createErrorElement,
  hideError,
  showError,
} from "./utils/formErrorHandler.js";

// get token from cookies
const getToken = () => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  return cookie ? cookie.split("=")[1] : null;
};

// check authentication status

const checkAuth = () => {
  const token = getToken();
  const currentPath = window.location.pathname;

  // Pages that are allowed for guests (not logged in)
  const publicPages = [
    "/sign-in.html",
    "/sign-up.html",
    "/forgot-password.html",
    "/reset-password.html",
  ];

  const isPublicPage = publicPages.some((page) => currentPath.endsWith(page));

  if (token) {
    // If the user is logged in and trying to access a public page, redirect to dashboard
    if (isPublicPage) {
      window.location.href = "index.html";
    }
  } else {
    // If the user is logged out and trying to access a protected page, redirect to login
    if (!isPublicPage) {
      window.location.href = "sign-in.html";
    }
  }
};

document.addEventListener("DOMContentLoaded", checkAuth);

// Login
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const signInError = createErrorElement("signInError");
  loginForm.querySelector(".form-footer")?.before(signInError);

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError(signInError);

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      showError(signInError, "All fields are required");
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to log in");
      }

      const data = await response.json();
      alert(`${data.message}!`);
      window.location.href = "index.html";
    } catch (error) {
      showError(signInError, error.message);
    }
  });
});

//  Signup
document.addEventListener("DOMContentLoaded", () => {
  const emailForm = document.getElementById("email-form");
  const sendOtpButton = document.getElementById("sendOtpBtn");
  const signUpForm = document.getElementById("signup-form");
  const signupEmailField = document.getElementById("signupEmail");
  const emailInput = document.getElementById("email");
  const otpInput = document.getElementById("otp");

  if (!signUpForm || !emailForm) return;

  const emailError = createErrorElement("emailError");
  emailInput.parentNode.insertBefore(emailError, emailInput.nextSibling);

  const signupError = createErrorElement("signupError");
  signUpForm.querySelector(".form-footer")?.before(signupError);

  sendOtpButton.addEventListener("click", async (e) => {
    e.preventDefault();
    hideError(emailError);

    const email = emailInput.value.trim();
    hideError(emailError);
    if (!email) {
      showError(emailError, "Please enter a valid email address.");
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
        throw new Error(errorData.message || "Failed to send OTP");
      }

      alert("OTP sent successfully! Check your email.");
      emailForm.classList.add("hidden");
      signUpForm.classList.remove("hidden");
      signupEmailField.value = email;
    } catch (error) {
      showError(emailError, error.message);
    }
  });

  signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError(signupError);

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
      return;
    }
    if (password !== confirmPassword) {
      showError(signupError, "Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      alert("Account created successfully!");
      window.location.href = "index.html";
    } catch (error) {
      showError(signupError, error.message);
    }
  });
});

// 🔹 Handle Logout
const logout = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "sign-in.html";
};

// Attach logout event
document.getElementById("logoutBtn")?.addEventListener("click", logout);
