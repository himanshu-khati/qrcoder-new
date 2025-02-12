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
                                <div class="alert alert-important alert-success alert-dismissible" role="alert">
                                    <div class="d-flex">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon alert-icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
                                        </div>
                                        <div>
                                            Visitor Checked In.
                                        </div>
                                    </div>
                                </div>
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
                                        <div class="mb-3">
                                            <label class="form-label required">Visitor Check In Time</label>
                                            <div>
                                                <input type="text" class="form-control" value="20/11/2024 12:45 PM" placeholder="Enter additional details">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <a href="visitor-check-in-confirmed.php" class="btn btn-warning" style="display: block" data-bs-toggle="tooltip" data-bs-placement="top" title="Check In">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-square-rounded-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" fill="currentColor" stroke-width="0" /></svg>
                                    Cancel Check In
                                </a>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

<?php include('footer.php'); ?>