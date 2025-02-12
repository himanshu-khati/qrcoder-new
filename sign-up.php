<?php include('header.php'); ?>
<?php include('nav-header.php'); ?>

<div class="page page-center">
  <div class="container container-tight py-4">
    <div class="text-center mb-4">
      <a href="." class="navbar-brand navbar-brand-autodark">
        <img
          src="./static/logo.svg"
          width="110"
          height="32"
          alt="Tabler"
          class="navbar-brand-image" />
      </a>
    </div>
    <!-- enter email and send otp -->
    <form id="email-form" class="card card-md">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Create new Account</h2>
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input
            type="email"
            id="email"
            class="form-control"
            placeholder="Enter email"
            required />
          <div class="form-footer">
            <button
              type="button"
              id="sendOtpBtn"
              class="btn btn-primary w-100">
              Send OTP
            </button>
          </div>
        </div>
      </div>
    </form>
    <!-- full sign up form -->
    <form
      class="card card-md hidden"
      id="signup-form"
      action="./"
      method="get"
      autocomplete="off"
      novalidate>
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Complete Signup</h2>
        <div class="mb-3">
          <label class="form-label">First Name</label>
          <input
            type="text"
            id="firstName"
            class="form-control"
            placeholder="Enter First Name" />
        </div>
        <div class="mb-3">
          <label class="form-label">Last Name</label>
          <input
            type="text"
            id="lastName"
            class="form-control"
            placeholder="Enter last name"
            required />
        </div>
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input
            type="email"
            id="signupEmail"
            class="form-control"
            placeholder="Enter email"
            readonly />
        </div>
        <div class="mb-3">
          <label class="form-label">OTP</label>
          <input
            type="text"
            id="otp"
            class="form-control"
            placeholder="Enter OTP"
            required />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <div class="input-group input-group-flat">
            <input
              type="password"
              id="password"
              class="form-control"
              placeholder="Password"
              autocomplete="off" />
            <span class="input-group-text">
              <a
                href="#"
                class="link-secondary"
                title="Show password"
                data-bs-toggle="tooltip"><!-- Download SVG icon from http://tabler-icons.io/i/eye -->
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
                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path
                    d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                </svg>
              </a>
            </span>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            class="form-control"
            placeholder="Confirm password"
            required />
        </div>
        <div class="mb-3">
          <label class="form-check">
            <input type="checkbox" class="form-check-input" />
            <span class="form-check-label">Agree the
              <a href="./terms-of-service.html" tabindex="-1">terms and policy</a>.</span>
          </label>
        </div>
        <div class="form-footer">
          <button type="submit" class="btn btn-primary w-100">
            Create new account
          </button>
        </div>
      </div>
    </form>
    <div class="text-center text-secondary mt-3">
      Already have account?
      <a href="./sign-in.php" tabindex="-1">Sign in</a>
    </div>
  </div>
</div>
<!-- <script src="./dist/js/tabler.min.js?1692870487" defer></script> -->
<!-- <script src="./dist/js/demo.min.js?1692870487" defer></script> -->
<script type="module" src="./sign-up.js"></script>
</body>

</html>
<?php include('footer.php'); ?>