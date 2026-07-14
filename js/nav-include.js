// RUGGED PATH — SHARED NAV INCLUDE
// Fetches /partials/nav.html and injects it into #nav-placeholder on every
// page, then wires up the mobile hamburger toggle and marks the current
// page's link as active. Edit the nav markup in /partials/nav.html and the
// nav styling in /css/nav.css — never inline nav markup, CSS, active-link
// logic, or this toggle logic into an individual page again.

(function () {
  var placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;

  // Normalizes a path for comparison: strips a trailing "index.html" or
  // trailing slash so "/", "/index.html", and "" all compare equal, and
  // "/episodes.html" and "/episodes.html/" also compare equal.
  function normalize(path) {
    return path.replace(/index\.html$/, '').replace(/\/+$/, '') || '/';
  }

  function markActiveLinks() {
    var currentPath = normalize(window.location.pathname);
    var links = document.querySelectorAll('.nav-links a, .mobile-menu a');
    links.forEach(function (a) {
      var href = a.getAttribute('href');
      // Skip in-page anchors like #newsletter — they're never "active".
      if (!href || href.charAt(0) === '#') {
        a.classList.remove('active');
        return;
      }
      if (normalize(href) === currentPath) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  fetch('/partials/nav.html')
    .then(function (res) { return res.text(); })
    .then(function (html) {
      placeholder.outerHTML = html;

      markActiveLinks();

      var hamburger = document.getElementById('hamburger');
      var mobileMenu = document.getElementById('mobileMenu');
      if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function () {
          mobileMenu.classList.toggle('open');
        });
      }
    })
    .catch(function (err) {
      console.error('Nav include failed to load:', err);
    });
})();
