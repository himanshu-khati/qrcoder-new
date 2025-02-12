export const showConfirmModal = ({ title, message, onConfirm }) => {
  const existingModal = document.getElementById("confirmModal");
  if (existingModal) {
    existingModal.remove();
  }

  const modalHTML = `
      <div class="modal fade" id="confirmModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>${message}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" id="confirmAction">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modal = new bootstrap.Modal(document.getElementById("confirmModal"));
  modal.show();

  document.getElementById("confirmAction").addEventListener("click", () => {
    modal.hide();
    onConfirm();
  });
};
