import { saveSmtpSettingsApi, getSmtpSettings } from "./api/smtpSettingsApi.js";
import {
  getEmailSettings,
  saveEmailSettingsApi,
} from "./api/emailSettingsApi.js";
import { showToast } from "./utils/toast.js";

document.addEventListener("DOMContentLoaded", async () => {
  const settingsForm = document.getElementById("smtpSettingsForm");
  if (!settingsForm) {
    showToast("SMTP Settings form not found.", "danger");
    return;
  }

  const emailInput = document.getElementById("smtpEmail");
  const passwordInput = document.getElementById("smtpPassword");
  const serverInput = document.getElementById("smtpServer");
  const portInput = document.getElementById("smtpPort");

  const prefillForm = async () => {
    try {
      const response = await getSmtpSettings();

      if (!response || !response.success || !response.settings) {
        throw new Error("No SMTP settings found.");
      }

      const { email, password, server, port } = response.settings;

      emailInput.value = email || "";
      passwordInput.value = password || "";
      serverInput.value = server || "";
      portInput.value = port || "";
    } catch (error) {
      showToast("Could not fetch existing SMTP settings.", "danger");
    }
  };

  await prefillForm();

  settingsForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const server = serverInput.value.trim();
    const port = portInput.value.trim();

    if (!email || !password || !server || !port) {
      showToast("All fields are required.", "danger");
      return;
    }

    const settingsData = { email, password, server, port };

    try {
      const response = await saveSmtpSettingsApi(settingsData);
      showToast(
        response.message || "SMTP settings saved successfully",
        "success"
      );
    } catch (error) {
      showToast(error.message || "Failed to save SMTP settings", "danger");
    }
  });

  // email settings form
  const emailSettingsForm = document.getElementById("emailSettingsForm");
  const subjectInput = document.getElementById("emailSubject");
  const bodyInput = document.getElementById("emailBody");

  const prefillEmailForm = async () => {
    try {
      const { emailSettings } = await getEmailSettings();
      subjectInput.value = emailSettings.subject || "";
      bodyInput.value = emailSettings.body || "";
    } catch (error) {
      showToast(error.message || "Could not fetch email settings.", "danger");
    }
  };

  await prefillEmailForm();

  emailSettingsForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const subject = subjectInput.value.trim();
    const body = bodyInput.value.trim();

    if (!subject || !body) {
      showToast("Subject and body are required.", "danger");
      return;
    }

    try {
      const response = await saveEmailSettingsApi({ subject, body });
      showToast(
        response.message || "Email settings saved successfully.",
        "success"
      );
    } catch (error) {
      showToast(error.message || "Failed to save email settings.", "danger");
    }
  });
});
