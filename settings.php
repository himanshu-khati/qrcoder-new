<?php include('header.php'); ?>

<?php include('nav-header.php'); ?>

<?php include('nav.php'); ?>

<div class="page-wrapper">
    <div class="page-body">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <form id="smtpSettingsForm" class="card">
                        <div class="card-header">
                            <h3 class="card-title">Settings</h3>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label required">SMTP Email Address</label>
                                <div>
                                    <input id="smtpEmail" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label required">SMTP Email Password</label>
                                <div>
                                    <input id="smtpPassword" type="password" class="form-control" placeholder="Password">
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label required">SMTP Server</label>
                                <div>
                                    <input id="smtpServer" type="text" class="form-control" placeholder="Server">
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label required">SMTP Port</label>
                                <div>
                                    <input id="smtpPort" type="text" class="form-control" placeholder="Port">
                                </div>
                            </div>

                        </div>
                        <div class="card-footer">
                            <button type="submit" class="btn btn-primary">Save SMTP Settings</button>
                        </div>
                    </form>
                </div>
                <div class="col-md-6">
                    <form id="emailSettingsForm" class="card">
                        <div class="card-header">
                            <h3 class="card-title">Email HTML Settings</h3>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label required">Email Subject</label>
                                <input id="emailSubject" type="text" class="form-control" placeholder="Enter email subject">
                            </div>
                            <div class="mb-3">
                                <label class="form-label required">Email Body</label>
                                <textarea id="emailBody" class="form-control" rows="8" placeholder="Enter email body. Use {{visitorName}} and {{qrCode}} as placeholders for dynamic content."></textarea>
                                <small class="form-text text-muted">
                                    Use <code>{{visitorName}}</code> for the visitor's name and <code>{{qrCode}}</code> for the QR code in the email body.
                                </small>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button type="submit" class="btn btn-primary">Save Email Settings</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
</div>

<?php include('footer.php'); ?>
<script type="module" src="./settings.js"></script>