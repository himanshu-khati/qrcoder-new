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
                            <h3 class="card-title">Visitor ID: <span id="visitorSerial">-</span></h3>
                        </div>
                        <div class="card-body">
                            <div style="margin:0 0 20px;">
                                <img id="visitorQrCode" src="./dist/img/qrcode.png" style="border:#ccc thin solid; width:300px">
                            </div>
                            <div>
                                <span id="checkInButtonContainer"></span>
                                <a href="#" id="sendEmailBtn" class="btn btn-info" data-bs-toggle="tooltip" data-bs-placement="top" title="Send Email">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-mail-up">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 19h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v5.5" />
                                        <path d="M19 22v-6" />
                                        <path d="M22 19l-3 -3l-3 3" />
                                        <path d="M3 7l9 6l9 -6" />
                                    </svg>
                                    Send Email
                                </a>
                                <a href="#" id="deleteVisitorBtn" class="btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Visitor">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-trash-x">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
                                        <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" />
                                    </svg>
                                    Delete Visitor
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <form id="editVisitorForm" method="post" class="card">
                        <div class="card-header">
                            <h3 class="card-title">Edit a single Visitor</h3>
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
                                    <input type="tel" id="visitorMobile" class="form-control" placeholder="Enter mobile number">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label required">Visitor Additional Detail</label>
                                <div>
                                    <input id="visitorDetails" type="text" class="form-control" placeholder="Enter additional details">
                                </div>
                            </div>
                            <div>
                                <button type="submit" class="btn btn-primary">Save Visitor Information</button>
                            </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include('footer.php'); ?>
<script type="module" src="./visitor-single.js"></script>