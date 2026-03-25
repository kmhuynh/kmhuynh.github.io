/* ============================================
   MAIN.JS — Forest Academic Theme
   ============================================ */

// --- Theme Toggle ---
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  document.querySelector('.theme-toggle').textContent = next === 'dark' ? '🌙' : '☀️';
}

// Load saved theme or respect system preference
(function () {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

// Set toggle button text after DOM loads
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector('.theme-toggle');
  if (btn) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.textContent = isDark ? '🌙' : '☀️';
  }
});

// --- Mobile Nav Toggle ---
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }
});

// --- News Filtering ---
document.addEventListener('DOMContentLoaded', function () {
  var newsFilter = 'all';
  var newsExpanded = false;
  var newsList = document.querySelector('.news-list');
  var showAllBtn = document.querySelector('.show-all-btn');
  if (!newsList) return;

  var pubTags = ['journal', 'conference', 'preprint', 'abstract'];

  function applyNewsFilter() {
    var items = newsList.querySelectorAll('li');
    items.forEach(function (li) {
      var tag = li.dataset.tag;
      var match = newsFilter === 'all'
        || (newsFilter === 'publication' && pubTags.indexOf(tag) !== -1)
        || tag === newsFilter;
      li.style.display = match ? '' : 'none';
    });
    newsList.scrollTop = 0;
    newsList.style.maxHeight = newsExpanded ? 'none' : '240px';
    if (showAllBtn) {
      showAllBtn.textContent = newsExpanded ? 'Show less \u2191' : 'Show all \u2193';
    }
  }

  if (showAllBtn) {
    showAllBtn.addEventListener('click', function () {
      newsExpanded = !newsExpanded;
      applyNewsFilter();
    });
  }

  document.querySelectorAll('.news-filters .filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      newsFilter = btn.dataset.filter;
      newsExpanded = false;
      document.querySelectorAll('.news-filters .filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      applyNewsFilter();
    });
  });
});

// --- Generic Card Filtering (publications.html, talks.html) ---
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.card-filters').forEach(function (filterBar) {
    filterBar.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.dataset.filter;
        var targetSelector = filterBar.dataset.target;
        var items = document.querySelectorAll(targetSelector);

        filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');

        items.forEach(function (item) {
          var tags = (item.dataset.tags || '').split(' ');
          if (filter === 'all') {
            item.classList.remove('filtered-out');
          } else {
            item.classList.toggle('filtered-out', !tags.includes(filter));
          }
        });
      });
    });
  });
});

// --- Back to Top ---
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
