const API_BASE_URL = "https://qrcoder-server.onrender.com/api/v1";
// const API_BASE_URL = "http://localhost:4000/api/v1";
export const API_ENDPOINTS = {
  SEND_OTP: `${API_BASE_URL}/auth/sendOtp`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  CHECK_AUTH: `${API_BASE_URL}/auth/checkAuth`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  RESET_PASSWORD_TOKEN: `${API_BASE_URL}/auth/reset-password-token`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  ALL_VISITORS: `${API_BASE_URL}/visitor/allVisitors`,
  CHECKIN_VISITOR: `${API_BASE_URL}/visitor/:id/checkin`,
  CANCEL_CHECKIN: `${API_BASE_URL}/visitor/:id/cancelCheckin`,
  SEND_VISITOR_EMAIL: `${API_BASE_URL}/visitor/:id/sendMail`,
  SINGLE_VISITOR: `${API_BASE_URL}/visitor/:id`,
  DASHBOARD_STATS: `${API_BASE_URL}/visitor/dashboardData`,
  CREATE_VISITOR: `${API_BASE_URL}/visitor/newVisitor`,
  CREATE_VISITOR_SEND_MAIL: `${API_BASE_URL}/visitor/newVisitorWithMail`,
  BULK_UPLOAD_VISITORS: `${API_BASE_URL}/visitor/newVisitor/bulkUpload`,
  BULK_PREVIEW_VISITORS: `${API_BASE_URL}/visitor/newVisitor/preview`,
  STEP2_BULK_UPLOAD: `${API_BASE_URL}/visitor/newVisitor/step2Upload`,
  BULK_SAVE_AND_MAIL: `${API_BASE_URL}/visitor/newVisitor/bulk-save-and-email`,
  CREATE_CAMPAIGN: `${API_BASE_URL}/campaign/createCampaign`,
  GET_ALL_CAMPAIGN: `${API_BASE_URL}/campaign/getAllCampaign`,
  SINGLE_CAMPAIGN: `${API_BASE_URL}/campaign/:campaignId`,
  DOWNLOAD_REPORT: `${API_BASE_URL}/reports/downloadReport`,
  SMTP_SETTINGS: `${API_BASE_URL}/settings/smtpSettings`,
  EMAIL_SETTINGS: `${API_BASE_URL}/emailSettings/email-settings`,
  SEARCH_VISITORS: `${API_BASE_URL}/visitor/search`,
};

export default API_BASE_URL;
