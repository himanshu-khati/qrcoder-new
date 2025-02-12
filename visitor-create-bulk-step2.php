<?php include('header.php'); ?>

<?php include('nav-header.php'); ?>

<?php include('nav.php'); ?>

<div class="page-wrapper">
    <div class="page-body">
        <div class="container-xl">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Check data before uploading</h3>
                    </div>

                    <div class="table-responsive">
                        <table class="table card-table table-vcenter text-nowrap datatable">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Additional</th>
                                </tr>
                            </thead>
                            <tbody id="previewTableBody"></tbody>
                        </table>
                    </div>
                    <div class="card-footer">
                        <a id="sendMailAndSave" class="btn btn-primary">Save Visitors & Send All Emails</a>
                        <a id="saveVisitorsBtn" class="btn btn-secondary">Only Save Visitors</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include('footer.php'); ?>
<script type="module" src="./visitor-create-bulk-step2.js"></script>