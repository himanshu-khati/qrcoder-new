<?php include('header.php'); ?>

<?php include('nav-header.php'); ?>

<?php include('nav.php'); ?>

<div class="page-wrapper">
    <div class="page-body">
        <div class="container-xl">
            <div class="row row-cards">
                <div class="col-6">
                    <form id="bulkVisitorForm" class="card">
                        <div class="card-header">
                            <h3 class="card-title">Upload Visitor Details in Bulk</h3>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label required">Upload CSV File</label>
                                <div>
                                    <input id="csvFileInput" accept=".csv" type="file" class="form-control">
                                </div>
                            </div>
                            <div>
                                <button type="submit" id="uploadBtn" class="btn btn-primary">Upload Visitors</button>
                                <a class="btn btn-secondary">Download example file</a>
                            </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include('footer.php'); ?>
<script type="module" src="./visitor-create-bulk.js"></script>