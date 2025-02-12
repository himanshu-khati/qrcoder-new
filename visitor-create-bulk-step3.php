<?php include('header.php'); ?>

<?php include('nav-header.php'); ?>

<?php include('nav.php'); ?>

<div class="page-wrapper">
    <div class="page-body">
        <div class="container-xl">
            <div class="row row-cards">
                <div class="col-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title"> <span id="totalVisitorsCreated">0</span> Visitors Created Successfully</h3>
                        </div>
                        <div class="card-body">
                            <p>
                                <span id="totalVisitorsCreatedText">0</span> Visitors have been created.
                            </p>
                            <div>
                                <a id="seeAddedVisitors" class="btn btn-primary">See Added visitors</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include('footer.php'); ?>

<script>
    const urlParams = new URLSearchParams(window.location.search);
    const campaignId = urlParams.get("campaignId");
    document.addEventListener("DOMContentLoaded", () => {
        const totalVisitorsCreated = sessionStorage.getItem("totalVisitorsCreated") || "0";
        const seeUploadedVisitors = document.getElementById("seeAddedVisitors");
        document.getElementById("totalVisitorsCreated").textContent = totalVisitorsCreated;
        document.getElementById("totalVisitorsCreatedText").textContent = totalVisitorsCreated;
        sessionStorage.removeItem("totalVisitorsCreated");
        seeUploadedVisitors.addEventListener("click", () => {
            const redirectUrl = campaignId ?
                `campaign-edit.php?campaignId=${campaignId}` :
                "index.php";
            window.location.href = redirectUrl;
        })

    })
</script>