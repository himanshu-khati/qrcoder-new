<?php include('header.php'); ?>

<?php include('nav-header.php'); ?>

<?php include('nav.php'); ?>

<div class="page-wrapper">
    <div class="page-body">
        <div class="container-xl">
            <div class="row row-cards">
                <div class="col-12 col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Visitor Check In</h3>
                        </div>
                        <div class="card-body">
                            <div id="camera">
                                <h1>Scan from WebCam:</h1>
                                <div id="video-container">
                                    <video id="qr-video" style="width:100%"></video>
                                </div>
                                <hr>
                                <div>
                                    <button class="btn btn-primary" id="start-button">Start Scanning</button>
                                    <button class="btn btn-info" id="stop-button">Stop Scanning</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">Manual Check In</div>
                        </div>
                        <div class="card-body">
                            <form id="manualCheckInForm">
                                <div class="mb-3">
                                    <label class="form-label required">Enter Visitor Serial Number</label>
                                    <div>
                                        <input id="visitorSerial" type="text" class="form-control" placeholder="Enter Visitor Serial Number">
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-secondary">Manual Check In</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div style="font-size: 12px; margin: 20px 0 0; display: none;">
                        <p>Additional Settings</p>
                        <br>

                        <label>
                            Highlight Style
                            <select id="scan-region-highlight-style-select">
                                <option value="default-style">Default style</option>
                                <option value="example-style-1">Example custom style 1</option>
                                <option value="example-style-2">Example custom style 2</option>
                            </select>
                        </label>
                        <br>

                        <label>
                            <input id="show-scan-region" type="checkbox">
                            Show scan region canvas
                        </label>
                        <br>
                        <select id="inversion-mode-select">
                            <option value="original">Scan original (dark QR code on bright background)</option>
                            <option value="invert">Scan with inverted colors (bright QR code on dark background)</option>
                            <option value="both">Scan both</option>
                        </select>
                        <br>
                        <b>Device has camera: </b>
                        <span id="cam-has-camera"></span>
                        <br>
                        <div>
                            <b>Preferred camera:</b>
                            <select id="cam-list">
                                <option value="environment" selected>Environment Facing (default)</option>
                                <option value="user">User Facing</option>
                            </select>
                        </div>
                        <b>Camera has flash: </b>
                        <span id="cam-has-flash"></span>
                        <div>
                            <button id="flash-toggle">📸 Flash: <span id="flash-state">off</span></button>
                        </div>
                        <br>
                        <b>Detected QR code: </b>
                        <span id="cam-qr-result">None</span>
                        <br>
                        <b>Last detected at: </b>
                        <span id="cam-qr-result-timestamp"></span>
                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="module">
    document.addEventListener("DOMContentLoaded", async () => {
        try {
            const {
                default: QrScanner
            } = await import("./qrscanner.min.js");

            const video = document.getElementById('qr-video');
            const videoContainer = document.getElementById('video-container');
            const camHasCamera = document.getElementById('cam-has-camera');
            const camList = document.getElementById('cam-list');
            const camHasFlash = document.getElementById('cam-has-flash');
            const flashToggle = document.getElementById('flash-toggle');
            const flashState = document.getElementById('flash-state');
            const camQrResult = document.getElementById('cam-qr-result');
            const camQrResultTimestamp = document.getElementById('cam-qr-result-timestamp');
            const fileSelector = document.getElementById('file-selector');
            const manualCheckInForm = document.getElementById('manualCheckInForm');
            const visitorSerial = document.getElementById('visitorSerial');

            if (!video || !manualCheckInForm || !visitorSerial) {
                console.error("One or more required elements are missing from the DOM.");
                return;
            }

            function setResult(label, result) {
                console.log(result.data);
                label.textContent = result.data;
                camQrResultTimestamp.textContent = new Date().toString();
                label.style.color = 'teal';
                clearTimeout(label.highlightTimeout);
                label.highlightTimeout = setTimeout(() => label.style.color = 'inherit', 100);
                if (confirm('Valid visitor QR Code found')) {
                    window.location.href = `visitor-single.php?id=${result.data}`;
                }
            }

            // ####### Web Cam Scanning #######
            const scanner = new QrScanner(video, result => setResult(camQrResult, result), {
                onDecodeError: error => {
                    camQrResult.textContent = error;
                    camQrResult.style.color = 'inherit';
                },
                highlightScanRegion: true,
                highlightCodeOutline: true,
            });

            const updateFlashAvailability = () => {
                scanner.hasFlash().then(hasFlash => {
                    if (camHasFlash) camHasFlash.textContent = hasFlash;
                    if (flashToggle) flashToggle.style.display = hasFlash ? 'inline-block' : 'none';
                });
            };

            await scanner.start();
            updateFlashAvailability();

            QrScanner.listCameras(true).then(cameras => {
                cameras.forEach(camera => {
                    const option = document.createElement('option');
                    option.value = camera.id;
                    option.text = camera.label;
                    camList?.add(option);
                });
            });

            QrScanner.hasCamera().then(hasCamera => {
                if (camHasCamera) camHasCamera.textContent = hasCamera;
            });

            // Optional elements
            document.getElementById('scan-region-highlight-style-select')?.addEventListener('change', (e) => {
                videoContainer.className = e.target.value;
                scanner._updateOverlay();
            });

            document.getElementById('show-scan-region')?.addEventListener('change', (e) => {
                const input = e.target;
                const label = input.parentNode;
                label.parentNode.insertBefore(scanner.$canvas, label.nextSibling);
                scanner.$canvas.style.display = input.checked ? 'block' : 'none';
            });

            document.getElementById('inversion-mode-select')?.addEventListener('change', event => {
                scanner.setInversionMode(event.target.value);
            });

            camList?.addEventListener('change', event => {
                scanner.setCamera(event.target.value).then(updateFlashAvailability);
            });

            flashToggle?.addEventListener('click', () => {
                scanner.toggleFlash().then(() => {
                    if (flashState) flashState.textContent = scanner.isFlashOn() ? 'on' : 'off';
                });
            });

            document.getElementById('start-button')?.addEventListener('click', () => {
                scanner.start();
            });

            document.getElementById('stop-button')?.addEventListener('click', () => {
                scanner.stop();
            });

            // ####### File Scanning #######
            fileSelector?.addEventListener('change', event => {
                const file = fileSelector.files[0];
                if (!file) return;

                QrScanner.scanImage(file, {
                        returnDetailedScanResult: true
                    })
                    .then(result => setResult(fileQrResult, result))
                    .catch(e => setResult(fileQrResult, {
                        data: e || 'No QR code found.'
                    }));
            });

            manualCheckInForm?.addEventListener('submit', (event) => {
                event.preventDefault();
                console.log("Manual check-in form submitted.");
                const serialNumber = visitorSerial?.value.trim();

                if (!serialNumber) {
                    alert('Please enter a valid visitor serial number.');
                    return;
                }

                window.location.href = `visitor-single.php?id=${serialNumber}`;
            });

        } catch (error) {
            console.error("Error loading QrScanner:", error);
        }
    });
</script>


<style>
    #video-container {
        line-height: 0;
    }

    #video-container.example-style-1 .scan-region-highlight-svg,
    #video-container.example-style-1 .code-outline-highlight {
        stroke: #64a2f3 !important;
    }

    #video-container.example-style-2 {
        position: relative;
        width: max-content;
        height: max-content;
        overflow: hidden;
    }

    #video-container.example-style-2 .scan-region-highlight {
        border-radius: 30px;
        outline: rgba(0, 0, 0, .25) solid 50vmax;
    }

    #video-container.example-style-2 .scan-region-highlight-svg {
        display: none;
    }

    #video-container.example-style-2 .code-outline-highlight {
        stroke: rgba(255, 255, 255, .5) !important;
        stroke-width: 15 !important;
        stroke-dasharray: none !important;
    }

    #flash-toggle {
        display: none;
    }
</style>
<?php include('footer.php'); ?>