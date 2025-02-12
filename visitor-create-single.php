<?php include('header.php'); ?>

<?php include('nav-header.php'); ?>

<?php include('nav.php'); ?>

<div class="page-wrapper">
    <div class="page-body">
        <div class="container-xl">
            <div class="row row-cards">
                <div class="col-6">
                    <form id="createVisitorForm" method="post" class="card">
                        <div class="card-header">
                            <h3 class="card-title">Create a single Visitor</h3>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label required">Visitor Name</label>
                                <div>
                                    <input id="visitorName" type="text" class="form-control" placeholder="Enter name">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label required">Visitor Email address</label>
                                <div>
                                    <input id="visitorEmail" type="email" class="form-control" placeholder="Enter email">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label required">Visitor Mobile Number</label>
                                <div>
                                    <input id="visitorMobile" type="tel" class="form-control" placeholder="Enter mobile number">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label required">Visitor Additional Detail</label>
                                <div>
                                    <input id="visitorDetails" type="text" class="form-control" placeholder="Enter additional details">
                                </div>
                            </div>
                            <div>
                                <button type="submit" id="saveVisitorBtn" class="btn btn-primary">Save Visitor</button>
                                <button type="submit" id="saveAndSendEmailBtn" class="btn btn-secondary">Save & Send Email</button>
                            </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include('footer.php'); ?>
<script type="module" src="./visitor-create-single.js"></script>