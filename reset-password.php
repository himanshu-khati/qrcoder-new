<?php include('header.php'); ?>

<div class="page page-center">
    <div class="container container-tight py-4">
        <form id="resetPasswordForm" class="card card-md">
            <div class="card-body">
                <h2 class="card-title text-center mb-4">Reset Password</h2>
                <input type="hidden" id="resetToken" />
                <div class="mb-3">
                    <label class="form-label">New Password</label>
                    <input type="password" id="newPassword" class="form-control" required />
                </div>
                <div class="mb-3">
                    <label class="form-label">Confirm Password</label>
                    <input type="password" id="confirmPassword" class="form-control" required />
                </div>
                <div class="form-footer">
                    <button type="submit" id="resetPasswordBtn" class="btn btn-primary w-100">
                        Reset Password
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>

<script src="./reset-password.js" type="module"></script>