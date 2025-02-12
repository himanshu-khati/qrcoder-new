<?php include('header.php'); ?>

<?php include('nav-header.php'); ?>

<?php include('nav.php'); ?>

<div class="page-wrapper">

  <!-- Page body -->
  <div class="page-body">
    <div class="container-xl">
      <div class="row row-deck row-cards">
        <!-- Row 1 -->
        <div class="col-sm-6 col-lg-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="subheader">Total Visitors</div>
              </div>
              <div class="h1 mb-3" id="totalVisitors">0</div>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-lg-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="subheader">QR Codes Generated</div>
              </div>
              <div class="h1 mb-3" id="totalQrCodes">0</div>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-lg-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="subheader">Checked In</div>
              </div>
              <div class="h1 mb-3" id="checkedInVisitors">0</div>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-lg-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="subheader">Pending</div>
              </div>
              <div class="h1 mb-3" id="pendingVisitors">0</div>
            </div>
          </div>
        </div>


        <!-- Row 2 -->
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">All Visitors</h3>
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
                    <th>Actions</th>
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
                <!-- <li class="page-item disabled"><a class="page-link" href="#">2</a></li> -->
                <!-- <li class="page-item disabled"><a class="page-link" href="#">3</a></li> -->
                <!-- <li class="page-item disabled"><a class="page-link" href="#">4</a></li> -->
                <!-- <li class="page-item disabled"><a class="page-link" href="#">5</a></li> -->
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
</div>

<?php include('footer.php'); ?>
<script type="module" src="./visitorsTable.js"></script>