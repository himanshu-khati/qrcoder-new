<?php include('header.php'); ?>

    <?php include('nav-header.php'); ?>

    <?php include('nav.php'); ?>

      <div class="page-wrapper">
        <div class="page-body">
            <div class="container-xl">
                <div class="row row-cards d-flex justify-content-center">
                    <div class="col-6 align-center">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title"><b>Visitor ID : 0010413</b></h3>
                            </div>
                            <div class="card-body">
                                <div style="margin:0 0 20px;">
                                    <img src="./dist/img/qrcode.png" style="border:#ccc thin solid; max-width:200px">
                                </div>
                                <form action="visitor-single.php" method="post" disabled>
                                    <div class="">
                                        <div class="mb-3">
                                            <label class="form-label required">Visitor Name</label>
                                            <div>
                                            <input type="text" class="form-control" value="Krishna" placeholder="Enter name">
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label required">Visitor Email address</label>
                                            <div>
                                            <input type="email" class="form-control" value="krishna@ondc.com" placeholder="Enter email">
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label required">Visitor Mobile Number</label>
                                            <div>
                                                <input type="tel" class="form-control" value="9958609217" placeholder="Enter mobile number">
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label required">Visitor Additional Detail</label>
                                            <div>
                                                <input type="text" class="form-control" value="ONDC" placeholder="Enter additional details">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <a href="visitor-check-in-confirmed.php" class="btn btn-success" style="display: block" data-bs-toggle="tooltip" data-bs-placement="top" title="Check In">
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" /></svg>
                                    Check In
                                </a>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

<?php include('footer.php'); ?>