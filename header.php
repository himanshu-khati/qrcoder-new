<!doctype html>
<!--
* Tabler - Premium and Open Source dashboard template with responsive and high quality UI.
* @version 1.0.0-beta20
* @link https://tabler.io
* Copyright 2018-2023 The Tabler Authors
* Copyright 2018-2023 codecalm.net Paweł Kuna
* Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
-->
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>QR Coder - QR Code Management Software</title>
  <!-- CSS files -->
  <link href="./dist/css/tabler.css?1692870487" rel="stylesheet" />
  <link href="./dist/css/tabler-flags.css?1692870487" rel="stylesheet" />
  <link href="./dist/css/tabler-payments.css?1692870487" rel="stylesheet" />
  <link href="./dist/css/tabler-vendors.css?1692870487" rel="stylesheet" />
  <link href="./dist/css/demo.css?1692870487" rel="stylesheet" />
  <style>
    @import url('https://rsms.me/inter/inter.css');

    :root {
      --tblr-font-sans-serif: 'Inter Var', -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif;
    }

    body {
      font-feature-settings: "cv03", "cv04", "cv11";
    }

    .text-danger {
      color: #dc3545;
      font-size: 0.875rem;
    }

    .hidden {
      display: none;
    }
  </style>
  <script type="module" src="./checkAuth.js"></script>
</head>

<body>
  <script src="./dist/js/demo-theme.js?1692870487"></script>
  <div class="page">
    <div id="toast-container" class="toast-container position-fixed top-0 end-0 p-3"></div>
    <div id="modal-container"></div>