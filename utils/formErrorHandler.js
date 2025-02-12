export const createErrorElement = (elementId) => {
  const errorElement = document.createElement("div");
  errorElement.id = elementId;
  errorElement.classList.add("text-danger", "mt-2", "small");
  errorElement.style.display = "none";
  return errorElement;
};

export const showError = (errorElement, message) => {
  errorElement.textContent = message;
  errorElement.style.display = "block";
};

export const hideError = (errorElement) => {
  errorElement.textContent = "";
  errorElement.style.display = "none";
};
