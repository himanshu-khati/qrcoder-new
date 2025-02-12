<?php include('header.php'); ?>
<?php include('nav-header.php'); ?>

<div class="page page-center">
  <div class="container container-tight py-4">
    <form id="forgotPasswordForm" class="card card-md">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Forgot Password</h2>
        <p class="text-secondary mb-4">
          Enter your email address and we will send you a password reset
          link.
        </p>
        <div class="mb-3">
          <label class="form-label">Email Address</label>
          <input
            type="email"
            id="emailInput"
            class="form-control"
            placeholder="Enter email"
            required />
        </div>
        <div class="form-footer">
          <button
            type="submit"
            id="resetPasswordBtn"
            class="btn btn-primary w-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
              <path d="M3 7l9 6l9 -6" />
            </svg>
            <span id="resetBtnText">Send Reset Link</span>
          </button>
        </div>
      </div>
    </form>
    <div class="text-center text-secondary mt-3">
      Forget it? <a href="./sign-in.php">Go back to Sign In</a>
    </div>
  </div>
</div>
<!-- JS -->
<script src="./dist/js/tabler.min.js?1692870487" defer></script>
<script src="./dist/js/demo.min.js?1692870487" defer></script>
<script src="./forgot-password.js" type="module"></script>
</body>

</html>
<?php include('footer.php'); ?>