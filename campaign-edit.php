<?php include('header.php'); ?>
<?php include('nav-header.php'); ?>
<?php include('nav.php'); ?>

<div class="page-wrapper">
    <div class="page-body">
        <div class="container-xl">
            <div class="row   row-cards">
                <div class="col-6  ">
                    <form id="editCampaignForm" method="post" class="card">
                        <div class="card-header">
                            <h3 class="card-title">Edit Campaign</h3>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label required">Campaign Name</label>
                                <div>
                                    <input id="campaignName" type="text" class="form-control" required placeholder="Enter name">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label required">Campaign Description</label>
                                <div>
                                    <input id="campaignDescription" type="text" class="form-control" required placeholder="Enter description">
                                </div>
                            </div>
                            <div>
                                <button id="saveChangesBtn" type="submit" class="btn btn-primary mb-4">Save Changes</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="col-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Add Visitors to Campaign</h3>
                        </div>
                        <div class="card-body">
                            <a id="addSingleVisitorBtn" class="btn btn-primary mb-3">Add a Single Visitor</a>
                            <a id="bulkAddVisitorsBtn" class="btn btn-secondary mb-3">Bulk Add Visitors</a>
                        </div>
                    </div>

                    <div class="card mt-2">
                        <div class="card-header">
                            <h3 class="card-title">Download Reports</h3>
                        </div>
                        <div class="card-body">
                            <a id="all-visitors-report" class="btn btn-primary mb-3">All Visitors Report</a>
                            <a id="checked-in-visitors-report" class="btn btn-primary mb-3">Checked-in Visitors Report</a>
                            <a id="pending-visitors-report" class="btn btn-primary mb-3">Pending Visitors Report</a>
                        </div>
                    </div>

                </div>
            </div>

            <div class="col-12 my-4">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Visitors In Campaign</h3>
                    </div>

                    <div class="table-responsive">
                        <table class="table card-table table-vcenter text-nowrap datatable">
                            <thead>
                                <tr>
                                    <th class="w-1">ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Additional</th>
                                    <th>QR Code</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="visitorsTableBody">
                            </tbody>
                        </table>
                    </div>
                    <div class="card-footer d-flex align-items-center">
                        <p class="m-0 text-secondary">Showing <span id="startEntry">1</span> to <span span id="endEntry">10</span> of <span id="totalEntries">12</span> entries</p>
                        <ul class="pagination m-0 ms-auto" id="paginationControls">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                                    <!-- Download SVG icon from http://tabler-icons.io/i/chevron-left -->
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M15 6l-6 6l6 6" />
                                    </svg>
                                    prev
                                </a>
                            </li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item disabled">
                                <a class="page-link" href="#">
                                    next
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M9 6l6 6l-6 6" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include('footer.php'); ?>
<script type="module" src="./campaign-edit.js"></script>