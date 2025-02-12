<?php include('header.php'); ?>

<?php include('nav-header.php'); ?>

<?php include('nav.php'); ?>

<div class="page-wrapper">
    <div class="page-body">
        <div class="container-xl">
            <div class="row row-cards">
                <div class="col-6">
                    <form id="createCampaignForm" method="post" class="card">
                        <div class="card-header">
                            <h3 class="card-title">Create a Campaign</h3>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label required">Campaign Name</label>
                                <div>
                                    <input id="campaignName" type="text" class="form-control" placeholder="Enter name">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label required">Campaign Description</label>
                                <div>
                                    <input id="campaignDescription" type="text" class="form-control" placeholder="Enter desc">
                                </div>
                            </div>
                            <div>
                                <button type="submit" class="btn btn-primary">Save Campaign</button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include('footer.php'); ?>
<script type="module" src="./campaign-create.js"></script>