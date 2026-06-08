/**
 * Shared Navbar & Footer component loader
 * Each page sets `currentPage` before including this script.
 * @example <script>var currentPage="index";</script>
 */
(function () {
  'use strict';

  function loadComponents() {
    var page = typeof currentPage !== 'undefined' ? currentPage : 'index';

    var pages = {
      index:   { label: 'Trang Chủ',   href: 'index.html' },
      tiendo:  { label: 'Tiến Độ',      href: 'tiendo.html' },
      donggop: { label: 'Đóng Góp',     href: 'donggop.html' },
      lienhe:  { label: 'Liên Hệ',      href: 'lienhe.html' },
    };

    // --- Navbar ---
    var navPlaceholder = document.getElementById('navbar-placeholder');
    if (navPlaceholder) {
      var navLinks = '';
      Object.keys(pages).forEach(function (key) {
        var p = pages[key];
        var activeClass = key === page ? 'active' : '';
        navLinks +=
          '<li class="nav-item">' +
            '<a class="nav-link ' + activeClass + '" href="' + p.href + '">' + p.label + '</a>' +
          '</li>';
      });

      navPlaceholder.innerHTML =
        '<nav class="navbar navbar-expand-md navbar-custom sticky-top py-3">' +
          '<div class="container">' +
            '<a class="navbar-brand d-flex align-items-center gap-2" href="index.html">' +
              '<img src="assets/images/logo.png" alt="Logo Đan Viện Thiên Hòa" id="navbarLogo" style="height: 55px; width: 55px; object-fit: contain;">' +
              '<span>Đan Viện Thiên Hòa</span>' +
            '</a>' +
            '<button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">' +
              '<span class="navbar-toggler-icon"></span>' +
            '</button>' +
            '<div class="collapse navbar-collapse" id="mainNavbar">' +
              '<ul class="navbar-nav ms-auto gap-2 mt-3 mt-md-0">' +
                navLinks +
              '</ul>' +
            '</div>' +
          '</div>' +
        '</nav>';
    }

    // --- Footer ---
    var footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      footerPlaceholder.innerHTML =
        '<footer class="footer-custom py-5 mt-5">' +
          '<div class="container">' +
            '<div class="row g-4">' +
              '<div class="col-md-5">' +
                '<h4 class="mb-3">Đan Viện Biển Đức Thiên Hòa</h4>' +
                '<p class="small text-muted-custom">Đan viện chiêm niệm Biển Đức (OSB) trực thuộc Giáo phận Ban Mê Thuột. Sứ mạng hiệp thông, cầu nguyện và lao động.</p>' +
              '</div>' +
              '<div class="col-md-3 offset-md-1">' +
                '<h5 class="mb-3">Liên Kết Nhanh</h5>' +
                '<ul class="list-unstyled d-flex flex-column gap-2">' +
                  '<li><a href="index.html">Trang Chủ</a></li>' +
                  '<li><a href="tiendo.html">Tiến Độ</a></li>' +
                  '<li><a href="donggop.html">Đóng Góp</a></li>' +
                  '<li><a href="lienhe.html">Liên Hệ</a></li>' +
                '</ul>' +
              '</div>' +
              '<div class="col-md-3">' +
                '<h5 class="mb-3">Địa Chỉ Liên Hệ</h5>' +
                '<p class="small text-muted-custom mb-1"><i class="bi bi-geo-alt me-2"></i>Thôn 5, Xã Tân Tiến, Huyện Krông Pắc, Tỉnh Đắk Lắk, Việt Nam</p>' +
                '<p class="small text-muted-custom mb-1"><i class="bi bi-telephone me-2"></i>+84 908 802 831</p>' +
                '<p class="small text-muted-custom"><i class="bi bi-envelope me-2"></i>thienhoaosb@yahoo.com</p>' +
              '</div>' +
            '</div>' +
            '<div class="text-center pt-4 mt-4 border-top border-secondary small">' +
              '&copy; 2026 Đan Viện Biển Đức Thiên Hòa. Bảo lưu mọi quyền.' +
            '</div>' +
          '</div>' +
        '</footer>';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
  } else {
    loadComponents();
  }
})();
