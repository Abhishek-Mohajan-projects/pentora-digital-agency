/* ============================================
   PENTORA DIGITAL - PREMIUM UPGRADES
   ============================================ */

(function () {
  'use strict';

  // --- DOM Ready ---
  document.addEventListener('DOMContentLoaded', function () {

    // ===================== BANNER OFFSET RECALK =====================
    function recalcBannerOffset() {
      var navbar = document.querySelector('.navbar');
      if (!navbar) return;

      var aboveTotal = 0;
      var belowTotal = 0;

      var annBar = document.querySelector('.announcement-bar');
      if (annBar && annBar.offsetParent !== null) aboveTotal += annBar.offsetHeight;

      var holiday = document.querySelector('.holiday-notice');
      if (holiday && holiday.classList.contains('show') && holiday.offsetParent !== null) aboveTotal += holiday.offsetHeight;

      var offer = document.getElementById('offer-banner');
      if (offer && offer.classList.contains('show') && offer.offsetParent !== null) belowTotal += offer.offsetHeight;

      var navbarH = navbar.offsetHeight || 72;
      document.documentElement.style.setProperty('--banner-above', aboveTotal + 'px');
      document.documentElement.style.setProperty('--banner-total', (aboveTotal + belowTotal) + 'px');

      document.querySelectorAll('.hero').forEach(function (hero) {
        hero.style.paddingTop = (navbarH + aboveTotal + belowTotal) + 'px';
      });
      document.querySelectorAll('.page-header').forEach(function (ph) {
        ph.style.paddingTop = (navbarH + aboveTotal + belowTotal + 40) + 'px';
      });
    }
    window.recalcBannerOffset = recalcBannerOffset;

    // ===================== ANNOUNCEMENT BAR =====================
    (function announcementBar() {
      var bar = document.getElementById('announcement-bar');
      if (!bar) {
        var msg = [
          { icon: '🚀', text: 'Free Consultation Available' },
          { icon: '🎉', text: 'Get 20% OFF on Your First Project' },
          { icon: '🌐', text: 'Modern Website Design & Digital Marketing' },
          { icon: '📞', text: 'Contact Us Today' }
        ];
        var items = msg.concat(msg);
        var html = '<div class="announcement-bar" id="announcement-bar"><div class="announcement-bar-inner">';
        items.forEach(function (m) {
          html += '<span class="announcement-bar-item">' + m.icon + ' ' + m.text + '</span>';
        });
        html += '</div></div>';
        var nav = document.querySelector('.navbar');
        if (nav) {
          nav.parentNode.insertBefore(
            (function () { var d = document.createElement('div'); d.innerHTML = html; return d.firstElementChild; })(),
            nav
          );
          document.body.classList.add('has-announcement');
          recalcBannerOffset();
        }
      }
    })();

    // ===================== NAVBAR SEARCH TRIGGER =====================
    (function searchTrigger() {
      var actions = document.querySelector('.nav-actions');
      if (!actions) return;
      var btn = document.createElement('button');
      btn.className = 'search-trigger';
      btn.setAttribute('aria-label', 'Search');
      btn.innerHTML = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
      btn.addEventListener('click', function () {
        document.getElementById('search-overlay').classList.add('open');
        setTimeout(function () {
          document.getElementById('search-input').focus();
        }, 200);
      });
      var themeToggle = actions.querySelector('.theme-toggle');
      if (themeToggle) {
        actions.insertBefore(btn, themeToggle);
      } else {
        actions.appendChild(btn);
      }
    })();

    // ===================== LIVE SEARCH =====================
    (function liveSearch() {
      var overlay = document.getElementById('search-overlay');
      if (overlay) return;
      overlay = document.createElement('div');
      overlay.className = 'search-overlay';
      overlay.id = 'search-overlay';
      overlay.innerHTML =
        '<div class="search-modal">' +
          '<div class="search-modal-header">' +
            '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
            '<input type="text" class="search-modal-input" id="search-input" placeholder="Search services, portfolio, pages..." autocomplete="off">' +
            '<button class="search-modal-close" aria-label="Close search"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
          '</div>' +
          '<div class="search-modal-results" id="search-results">' +
            '<div class="search-no-results">Start typing to search...</div>' +
          '</div>' +
        '</div>';
      document.body.appendChild(overlay);

      var searchData = [
        { label: 'Home', url: 'index.html', cat: 'Pages' },
        { label: 'About Us', url: 'about.html', cat: 'Pages' },
        { label: 'Portfolio', url: 'portfolio.html', cat: 'Pages' },
        { label: 'Skills', url: 'skills.html', cat: 'Pages' },
        { label: 'Contact', url: 'contact.html', cat: 'Pages' },
        { label: 'FAQ', url: 'faq.html', cat: 'Pages' },
        { label: 'Blog', url: 'blog.html', cat: 'Pages' },
        { label: 'Privacy Policy', url: 'privacy.html', cat: 'Pages' },
        { label: 'Terms of Service', url: 'terms.html', cat: 'Pages' },
        { label: 'Cookie Policy', url: 'cookie-policy.html', cat: 'Pages' },
        { label: 'Social Media Marketing', url: 'portfolio.html', cat: 'Services' },
        { label: 'Graphics Design', url: 'portfolio.html', cat: 'Services' },
        { label: 'Landing Page Design', url: 'portfolio.html', cat: 'Services' },
        { label: 'Brand Awareness Campaign', url: 'portfolio.html', cat: 'Portfolio' },
        { label: 'Complete Brand Identity', url: 'portfolio.html', cat: 'Portfolio' },
        { label: 'SaaS Product Launch', url: 'portfolio.html', cat: 'Portfolio' },
        { label: 'How do I get started?', url: 'faq.html', cat: 'FAQ' },
        { label: 'What services do you offer?', url: 'faq.html', cat: 'FAQ' },
        { label: 'Pricing & Packages', url: 'faq.html', cat: 'FAQ' },
        { label: 'Turnaround time', url: 'faq.html', cat: 'FAQ' }
      ];

      var input = document.getElementById('search-input');
      var results = document.getElementById('search-results');

      input.addEventListener('input', function () {
        var q = input.value.toLowerCase().trim();
        if (!q) {
          results.innerHTML = '<div class="search-no-results">Start typing to search...</div>';
          return;
        }
        var matches = searchData.filter(function (item) {
          return item.label.toLowerCase().indexOf(q) !== -1 || item.cat.toLowerCase().indexOf(q) !== -1;
        });
        if (matches.length === 0) {
          results.innerHTML = '<div class="search-no-results">No results found for "' + input.value + '"</div>';
          return;
        }
        var html = '';
        matches.forEach(function (m) {
          var icon = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
          if (m.cat === 'Services') icon = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>';
          if (m.cat === 'Portfolio') icon = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>';
          if (m.cat === 'FAQ') icon = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
          html += '<a href="' + m.url + '" class="search-result-item" onclick="document.getElementById(\'search-overlay\').classList.remove(\'open\')">' +
            '<div class="search-result-icon">' + icon + '</div>' +
            '<div class="search-result-info"><strong>' + highlight(m.label, input.value) + '</strong><span>' + m.cat + '</span></div>' +
          '</a>';
        });
        results.innerHTML = html;
      });

      function highlight(text, q) {
        var idx = text.toLowerCase().indexOf(q.toLowerCase());
        if (idx === -1) return text;
        return text.substring(0, idx) + '<mark style="background:var(--primary-glow);color:var(--primary);border-radius:2px;padding:0 2px">' +
          text.substring(idx, idx + q.length) + '</mark>' + text.substring(idx + q.length);
      }

      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) overlay.classList.remove('open');
      });
      document.querySelector('.search-modal-close').addEventListener('click', function () {
        overlay.classList.remove('open');
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') overlay.classList.remove('open');
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          overlay.classList.toggle('open');
          if (overlay.classList.contains('open')) setTimeout(function () { input.focus(); }, 200);
        }
      });
    })();

    // ===================== FLOATING ACTION BUTTONS =====================
    (function floatingActions() {
      var container = document.getElementById('floating-actions');
      if (container) return;
      container = document.createElement('div');
      container.className = 'floating-actions';
      container.id = 'floating-actions';
      container.innerHTML =
        '<button class="floating-btn floating-btn-whatsapp" aria-label="WhatsApp" onclick="window.open(\'https://wa.me/880XXXXXXXXXX\',\'_blank\')">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
        '</button>' +
        '<button class="floating-btn floating-btn-phone" aria-label="Call us" onclick="window.location.href=\'tel:+880XXXXXXXXXX\'">' +
          '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>' +
        '</button>' +
        '<button class="floating-btn floating-btn-chat" aria-label="Live Chat" id="live-chat-btn">' +
          '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>' +
          '<span class="coming-soon-badge">Soon</span>' +
        '</button>' +
        '<button class="floating-btn floating-btn-top" id="back-to-top" aria-label="Back to top">' +
          '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><polyline points="18 15 12 9 6 15"/></svg>' +
        '</button>';
      document.body.appendChild(container);

      // Back to top
      var topBtn = document.getElementById('back-to-top');
      var scrollHandler = function () {
        if (window.scrollY > 400) {
          topBtn.classList.add('show');
        } else {
          topBtn.classList.remove('show');
        }
      };
      window.addEventListener('scroll', scrollHandler, { passive: true });
      topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      // Live chat coming soon
      document.getElementById('live-chat-btn').addEventListener('click', function () {
        showComingSoon('Live Chat');
      });
    })();

    // ===================== BACK TO TOP (via floating actions) =====================
    // Already handled above

    // ===================== COOKIE CONSENT =====================
    (function cookieConsent() {
      if (localStorage.getItem('pentora_cookie_consent')) return;
      var banner = document.getElementById('cookie-consent');
      if (banner) return;
      banner = document.createElement('div');
      banner.className = 'cookie-consent';
      banner.id = 'cookie-consent';
      banner.innerHTML =
        '<div class="cookie-consent-inner">' +
          '<p>We use cookies to enhance your experience. By continuing to visit this site you agree to our <a href="cookie-policy.html">Cookie Policy</a>.</p>' +
          '<div class="cookie-actions">' +
            '<button class="cookie-btn cookie-btn-decline" id="cookie-decline">Decline</button>' +
            '<button class="cookie-btn cookie-btn-accept" id="cookie-accept">Accept All</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(banner);
      setTimeout(function () { banner.classList.add('show'); }, 500);
      document.getElementById('cookie-accept').addEventListener('click', function () {
        localStorage.setItem('pentora_cookie_consent', 'accepted');
        banner.classList.remove('show');
        setTimeout(function () { banner.style.display = 'none'; }, 400);
      });
      document.getElementById('cookie-decline').addEventListener('click', function () {
        localStorage.setItem('pentora_cookie_consent', 'declined');
        banner.classList.remove('show');
        setTimeout(function () { banner.style.display = 'none'; }, 400);
      });
    })();

    // ===================== EXIT INTENT POPUP =====================
    (function exitPopup() {
      if (localStorage.getItem('pentora_exit_shown')) return;
      var overlay = document.getElementById('exit-popup');
      if (overlay) return;
      overlay = document.createElement('div');
      overlay.className = 'exit-popup-overlay';
      overlay.id = 'exit-popup';
      overlay.innerHTML =
        '<div class="exit-popup">' +
          '<button class="exit-popup-close" aria-label="Close"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
          '<div class="exit-popup-icon"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>' +
          '<h3>Wait! Don\'t Miss Out</h3>' +
          '<p>Get <strong>20% OFF</strong> your first project. Subscribe now and we\'ll send you premium tips and exclusive offers.</p>' +
          '<form class="exit-popup-form" id="exit-popup-form">' +
            '<input type="text" placeholder="Your Name" required>' +
            '<input type="email" placeholder="Your Email" required>' +
            '<button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">Get My 20% OFF</button>' +
          '</form>' +
        '</div>';
      document.body.appendChild(overlay);

      var shown = false;
      document.addEventListener('mouseleave', function (e) {
        if (shown) return;
        if (e.clientY > 0) return;
        shown = true;
        overlay.classList.add('open');
        localStorage.setItem('pentora_exit_shown', '1');
      });

      overlay.querySelector('.exit-popup-close').addEventListener('click', function () {
        overlay.classList.remove('open');
      });
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) overlay.classList.remove('open');
      });
      document.getElementById('exit-popup-form').addEventListener('submit', function (e) {
        e.preventDefault();
        showFormSuccess(this);
        overlay.classList.remove('open');
        localStorage.setItem('pentora_exit_lead', '1');
      });
    })();

    // ===================== OFFER BANNER =====================
    (function offerBanner() {
      if (localStorage.getItem('pentora_offer_hidden')) return;
      var banner = document.getElementById('offer-banner');
      if (banner) return;
      banner = document.createElement('div');
      banner.className = 'offer-banner';
      banner.id = 'offer-banner';
      banner.innerHTML =
        '<p>🎉 <strong>Limited Offer:</strong> Get 20% OFF on Your First Project — <a href="contact.html" style="color:#fbbf24;font-weight:700;text-decoration:underline;">Claim Now</a></p>' +
        '<button class="offer-banner-close" aria-label="Dismiss"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
      var main = document.querySelector('main') || document.body;
      main.parentNode.insertBefore(banner, main);
      setTimeout(function () { banner.classList.add('show'); recalcBannerOffset(); }, 2000);

      banner.querySelector('.offer-banner-close').addEventListener('click', function () {
        banner.classList.remove('show');
        localStorage.setItem('pentora_offer_hidden', '1');
        recalcBannerOffset();
      });
    })();

    // ===================== LEAD CAPTURE FORM =====================
    (function leadForm() {
      var overlay = document.getElementById('lead-modal');
      if (overlay) return;
      overlay = document.createElement('div');
      overlay.className = 'lead-modal-overlay';
      overlay.id = 'lead-modal';
      overlay.innerHTML =
        '<div class="lead-modal">' +
          '<button class="lead-modal-close" aria-label="Close"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
          '<h3>Get a Free Consultation</h3>' +
          '<p>Fill out this form and we\'ll reach out within 24 hours.</p>' +
          '<form class="lead-form" id="lead-capture-form">' +
            '<div class="form-row">' +
              '<div class="form-group"><label>Your Name</label><input type="text" placeholder="John Doe" required></div>' +
              '<div class="form-group"><label>Your Email</label><input type="email" placeholder="john@example.com" required></div>' +
            '</div>' +
            '<div class="form-group"><label>Service Interested In</label><select><option>Social Media Marketing</option><option>Graphics Design</option><option>Landing Page Design</option><option>Full Package</option></select></div>' +
            '<div class="form-group"><label>Message</label><textarea placeholder="Tell us about your project..." rows="3"></textarea></div>' +
            '<button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">Send Request</button>' +
          '</form>' +
        '</div>';
      document.body.appendChild(overlay);

      overlay.querySelector('.lead-modal-close').addEventListener('click', function () {
        overlay.classList.remove('open');
      });
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) overlay.classList.remove('open');
      });
      document.getElementById('lead-capture-form').addEventListener('submit', function (e) {
        e.preventDefault();
        showFormSuccess(this);
        setTimeout(function () { overlay.classList.remove('open'); }, 1500);
      });
    })();

    // ===================== REQUEST A QUOTE FORM =====================
    (function quoteForm() {
      var overlay = document.getElementById('quote-modal');
      if (overlay) return;
      overlay = document.createElement('div');
      overlay.className = 'lead-modal-overlay';
      overlay.id = 'quote-modal';
      overlay.innerHTML =
        '<div class="lead-modal">' +
          '<button class="lead-modal-close" aria-label="Close"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
          '<h3>Request a Quote</h3>' +
          '<p>Tell us about your project and get a customized quote.</p>' +
          '<form class="lead-form" id="quote-request-form">' +
            '<div class="form-row">' +
              '<div class="form-group"><label>Full Name</label><input type="text" placeholder="John Doe" required></div>' +
            '</div>' +
            '<div class="form-row">' +
              '<div class="form-group"><label>Email</label><input type="email" placeholder="john@example.com" required></div>' +
              '<div class="form-group"><label>Phone</label><input type="tel" placeholder="+880 XXXXXXXXXX"></div>' +
            '</div>' +
            '<div class="form-group"><label>Service</label><select><option>Social Media Marketing</option><option>Graphics Design</option><option>Landing Page Design</option><option>Full Package</option></select></div>' +
            '<div class="form-group"><label>Budget</label><select><option>Under $500</option><option>$500 - $1,000</option><option>$1,000 - $5,000</option><option>$5,000+</option></select></div>' +
            '<div class="form-group"><label>Project Details</label><textarea placeholder="Describe your project..." rows="3" required></textarea></div>' +
            '<button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">Get My Quote</button>' +
          '</form>' +
        '</div>';
      document.body.appendChild(overlay);

      overlay.querySelector('.lead-modal-close').addEventListener('click', function () {
        overlay.classList.remove('open');
      });
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) overlay.classList.remove('open');
      });
      document.getElementById('quote-request-form').addEventListener('submit', function (e) {
        e.preventDefault();
        showFormSuccess(this);
        setTimeout(function () { overlay.classList.remove('open'); }, 1500);
      });
    })();

    // ===================== CALCULATORS =====================
    (function calculators() {
      // ROI Calculator
      var roiMonthly = document.getElementById('roi-monthly');
      var roiInvestment = document.getElementById('roi-investment');
      var roiResult = document.getElementById('roi-result');
      if (roiMonthly && roiInvestment && roiResult) {
        function calcROI() {
          var monthly = parseFloat(roiMonthly.value) || 0;
          var invest = parseFloat(roiInvestment.value) || 0;
          var annualRevenue = monthly * 12;
          var roi = invest > 0 ? ((annualRevenue - invest) / invest) * 100 : 0;
          var displayVal = (monthly * 12 - invest).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
          roiResult.textContent = displayVal;
          document.getElementById('roi-percent').textContent = roi.toFixed(1) + '%';
          document.getElementById('roi-monthly-val').textContent = '$' + parseInt(roiMonthly.value).toLocaleString();
          document.getElementById('roi-invest-val').textContent = '$' + parseInt(roiInvestment.value).toLocaleString();
        }
        roiMonthly.addEventListener('input', calcROI);
        roiInvestment.addEventListener('input', calcROI);
        calcROI();

        document.getElementById('roi-monthly-val').textContent = '$' + roiMonthly.value;
        document.getElementById('roi-invest-val').textContent = '$' + roiInvestment.value;
      }

      // Pricing Calculator
      var pricePages = document.getElementById('price-pages');
      var priceSeo = document.getElementById('price-seo');
      var priceEcom = document.getElementById('price-ecom');
      var priceResult = document.getElementById('price-result');
      if (pricePages && priceResult) {
        function calcPrice() {
          var base = 500;
          var pages = parseInt(pricePages.value) || 1;
          base += (pages - 1) * 150;
          if (priceSeo && priceSeo.checked) base += 300;
          if (priceEcom && priceEcom.checked) base += 800;
          priceResult.textContent = base.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
          document.getElementById('price-breakdown').innerHTML =
            'Base design: $500<br>' +
            (pages > 1 ? 'Additional pages: $' + ((pages - 1) * 150) + '<br>' : '') +
            (priceSeo && priceSeo.checked ? 'SEO optimization: $300<br>' : '') +
            (priceEcom && priceEcom.checked ? 'E-commerce features: $800<br>' : '') +
            '<strong>Total: ' + priceResult.textContent + '</strong>';
        }
        pricePages.addEventListener('input', function () {
          document.getElementById('price-pages-val').textContent = pricePages.value;
          calcPrice();
        });
        if (priceSeo) priceSeo.addEventListener('change', calcPrice);
        if (priceEcom) priceEcom.addEventListener('change', calcPrice);
        calcPrice();
      }
    })();

    // ===================== FAQ ACCORDION =====================
    (function faqAccordion() {
      var items = document.querySelectorAll('.faq-item');
      if (items.length === 0) return;
      items.forEach(function (item) {
        var btn = item.querySelector('.faq-question');
        if (!btn) return;
        btn.addEventListener('click', function () {
          var isOpen = item.classList.contains('open');
          items.forEach(function (el) { el.classList.remove('open'); });
          if (!isOpen) item.classList.add('open');
        });
      });
    })();

    // ===================== FAQ SEARCH =====================
    (function faqSearch() {
      var input = document.getElementById('faq-search-input');
      var list = document.querySelector('.faq-list');
      if (!input || !list) return;
      input.addEventListener('input', function () {
        var q = input.value.toLowerCase().trim();
        var items = list.querySelectorAll('.faq-item');
        var visible = 0;
        items.forEach(function (item) {
          var text = item.textContent.toLowerCase();
          if (!q || text.indexOf(q) !== -1) {
            item.style.display = '';
            visible++;
          } else {
            item.style.display = 'none';
          }
        });
        var noResults = document.getElementById('faq-no-results');
        if (noResults) {
          noResults.style.display = visible === 0 ? 'block' : 'none';
        }
      });
    })();

    // ===================== LIVE CLOCK =====================
    (function liveClock() {
      var clock = document.getElementById('live-clock');
      if (!clock) {
        clock = document.createElement('span');
        clock.className = 'live-clock';
        clock.id = 'live-clock';
        var navActions = document.querySelector('.nav-actions');
        if (navActions) {
          var ref = navActions.querySelector('.theme-toggle') || navActions.querySelector('.btn-hire');
          if (ref) {
            navActions.insertBefore(clock, ref);
          } else {
            navActions.appendChild(clock);
          }
        }
      }
      function tick() {
        var now = new Date();
        var opts = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
        clock.innerHTML = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ' + now.toLocaleDateString('en-US', opts);
      }
      tick();
      setInterval(tick, 30000);
    })();

    // ===================== ACCESSIBILITY PANEL =====================
    (function a11yPanel() {
      if (document.querySelector('.a11y-trigger')) return;

      var html = document.documentElement;
      var STORAGE_KEY = 'pentora_a11y';

      // --- Load saved state ---
      var saved = {};
      try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch(e) {}

      function saveState() {
        var state = {};
        document.querySelectorAll('.a11y-feature[data-a11y]').forEach(function(btn) {
          state[btn.dataset.a11y] = btn.classList.contains('active');
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }

      function apply(attr, active) {
        html.classList.toggle('a11y-' + attr, active);
        var btn = document.querySelector('.a11y-feature[data-a11y="' + attr + '"]');
        if (btn) btn.classList.toggle('active', active);
        // Mutually exclusive groups
        if (attr === 'fs-sm') { apply('fs-lg', false); apply('fs-xl', false); }
        if (attr === 'fs-lg') { apply('fs-sm', false); apply('fs-xl', false); }
        if (attr === 'fs-xl') { apply('fs-sm', false); apply('fs-lg', false); }
        if (attr === 'ls-1') apply('ls-2', false);
        if (attr === 'ls-2') apply('ls-1', false);
        if (attr === 'lh-1') apply('lh-2', false);
        if (attr === 'lh-2') apply('lh-1', false);
        if (attr === 'ta-left') { apply('ta-center', false); apply('ta-right', false); }
        if (attr === 'ta-center') { apply('ta-left', false); apply('ta-right', false); }
        if (attr === 'ta-right') { apply('ta-left', false); apply('ta-center', false); }
        if (attr === 'sat-high') apply('sat-low', false);
        if (attr === 'sat-low') apply('sat-high', false);
        updateFilter();
        saveState();
      }

      function updateFilter() {
        var filters = [];
        if (html.classList.contains('a11y-grayscale')) filters.push('grayscale(100%)');
        if (html.classList.contains('a11y-sat-high')) filters.push('saturate(200%)');
        if (html.classList.contains('a11y-sat-low')) filters.push('saturate(50%)');
        html.style.filter = filters.length ? filters.join(' ') : '';
      }

      // --- Create trigger ---
      var trigger = document.createElement('button');
      trigger.className = 'a11y-trigger';
      trigger.setAttribute('aria-label', 'Accessibility options');
      trigger.innerHTML = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>';
      document.body.appendChild(trigger);

      // --- Create panel ---
      var panel = document.createElement('div');
      panel.className = 'a11y-panel';
      panel.id = 'a11y-panel';
      panel.innerHTML =
        '<div class="a11y-panel-header">' +
          '<h3><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg> Accessibility</h3>' +
          '<button class="a11y-panel-close" aria-label="Close panel"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
        '</div>' +

        '<div class="a11y-group">' +
          '<div class="a11y-group-label">Text Size</div>' +
          '<div class="a11y-row">' +
            '<button class="a11y-feature" data-a11y="fs-sm" aria-label="Decrease font size"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg> A-</button>' +
            '<button class="a11y-feature" data-a11y="fs-reset" aria-label="Reset font size">A\u00B0</button>' +
            '<button class="a11y-feature" data-a11y="fs-lg" aria-label="Increase font size">A+</button>' +
            '<button class="a11y-feature" data-a11y="fs-xl" aria-label="Extra large font size">A++</button>' +
          '</div>' +
        '</div>' +

        '<div class="a11y-group">' +
          '<div class="a11y-group-label">Visual Aids</div>' +
          '<div class="a11y-row">' +
            '<button class="a11y-feature" data-a11y="high-contrast" aria-label="Toggle high contrast"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20V2z"/></svg> Contrast</button>' +
            '<button class="a11y-feature" data-a11y="big-cursor" aria-label="Toggle big cursor"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg> Cursor</button>' +
            '<button class="a11y-feature" data-a11y="grayscale" aria-label="Toggle grayscale"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20V2z"/></svg> Gray</button>' +
            '<button class="a11y-feature" data-a11y="hide-images" aria-label="Hide images"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> Images</button>' +
          '</div>' +
        '</div>' +

        '<div class="a11y-group">' +
          '<div class="a11y-group-label">Content</div>' +
          '<div class="a11y-row">' +
            '<button class="a11y-feature" data-a11y="highlight-links" aria-label="Highlight links"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> Links</button>' +
            '<button class="a11y-feature" data-a11y="highlight-headings" aria-label="Highlight headings"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M6 4v16M18 4v16M6 12h12"/></svg> Headings</button>' +
            '<button class="a11y-feature" data-a11y="dyslexia" aria-label="Dyslexia friendly font"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg> Dyslexia</button>' +
          '</div>' +
        '</div>' +

        '<div class="a11y-group">' +
          '<div class="a11y-group-label">Animation</div>' +
          '<div class="a11y-row">' +
            '<button class="a11y-feature" data-a11y="reduce-motion" aria-label="Reduce motion"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> Reduce</button>' +
            '<button class="a11y-feature" data-a11y="pause-animations" aria-label="Pause animations"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause</button>' +
          '</div>' +
        '</div>' +

        '<div class="a11y-group">' +
          '<div class="a11y-group-label">Spacing</div>' +
          '<div class="a11y-row">' +
            '<button class="a11y-feature" data-a11y="ls-1" aria-label="Increase letter spacing"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><line x1="4" y1="20" x2="4" y2="4"/><line x1="20" y1="20" x2="20" y2="4"/><line x1="8" y1="12" x2="16" y2="12"/></svg> Space</button>' +
            '<button class="a11y-feature" data-a11y="ls-2" aria-label="Extra letter spacing"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><line x1="4" y1="20" x2="4" y2="4"/><line x1="20" y1="20" x2="20" y2="4"/><line x1="6" y1="12" x2="18" y2="12"/></svg> Space+</button>' +
            '<button class="a11y-feature" data-a11y="lh-1" aria-label="Increase line height"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="5 7 12 4 19 7"/><polyline points="5 17 12 20 19 17"/></svg> Line</button>' +
            '<button class="a11y-feature" data-a11y="lh-2" aria-label="Extra line height"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><line x1="12" y1="3" x2="12" y2="21"/><polyline points="5 6 12 3 19 6"/><polyline points="5 18 12 21 19 18"/></svg> Line+</button>' +
          '</div>' +
        '</div>' +

        '<div class="a11y-group">' +
          '<div class="a11y-group-label">Reading</div>' +
          '<div class="a11y-row">' +
            '<button class="a11y-feature" data-a11y="reading-guide-active" aria-label="Toggle reading guide"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><line x1="3" y1="12" x2="21" y2="12"/><polyline points="8 5 3 12 8 19"/><polyline points="16 5 21 12 16 19"/></svg> Guide</button>' +
            '<button class="a11y-feature" data-a11y="reading-mask-active" aria-label="Toggle reading mask"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg> Mask</button>' +
            '<button class="a11y-feature" data-a11y="ta-left" aria-label="Align text left"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="17" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg> Align</button>' +
          '</div>' +
        '</div>' +

        '<div class="a11y-group">' +
          '<div class="a11y-group-label">Focus & Color</div>' +
          '<div class="a11y-row">' +
            '<button class="a11y-feature" data-a11y="focus-visible" aria-label="Visible focus indicator"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2z"/><circle cx="12" cy="12" r="3"/></svg> Focus</button>' +
            '<button class="a11y-feature" data-a11y="focus-mode" aria-label="Toggle focus mode"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg> FocusMode</button>' +
            '<button class="a11y-feature" data-a11y="sat-high" aria-label="Increase saturation"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 1 0 0 20 7 7 0 0 0 0-20z"/></svg> Sat+</button>' +
            '<button class="a11y-feature" data-a11y="sat-low" aria-label="Decrease saturation"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"/></svg> Sat-</button>' +
          '</div>' +
        '</div>' +

        '<div class="a11y-group">' +
          '<button class="a11y-feature a11y-feature-reset" data-a11y="reset" aria-label="Reset all accessibility settings"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg> Reset All</button>' +
        '</div>';
      document.body.appendChild(panel);

      // --- Create reading guide element ---
      var guide = document.createElement('div');
      guide.className = 'a11y-reading-guide';
      document.body.appendChild(guide);

      // --- Create reading mask elements ---
      var maskTop = document.createElement('div');
      maskTop.className = 'a11y-reading-mask-top';
      var maskBottom = document.createElement('div');
      maskBottom.className = 'a11y-reading-mask-bottom';
      document.body.appendChild(maskTop);
      document.body.appendChild(maskBottom);

      // --- Create focus mode overlay ---
      var focusOverlay = document.createElement('div');
      focusOverlay.className = 'a11y-focus-overlay';
      document.body.appendChild(focusOverlay);

      // --- Panel toggle ---
      trigger.addEventListener('click', function() {
        panel.classList.toggle('show');
        trigger.classList.toggle('active');
      });
      panel.querySelector('.a11y-panel-close').addEventListener('click', function() {
        panel.classList.remove('show');
        trigger.classList.remove('active');
      });
      document.addEventListener('click', function(e) {
        if (!panel.contains(e.target) && e.target !== trigger && !trigger.contains(e.target)) {
          panel.classList.remove('show');
          trigger.classList.remove('active');
        }
      });

      // --- Feature clicks ---
      panel.addEventListener('click', function(e) {
        var btn = e.target.closest('.a11y-feature');
        if (!btn) return;
        var attr = btn.dataset.a11y;

        if (attr === 'reset') {
          document.querySelectorAll('.a11y-feature[data-a11y]').forEach(function(b) {
            if (b.dataset.a11y !== 'reset') {
              html.classList.remove('a11y-' + b.dataset.a11y);
              b.classList.remove('active');
            }
          });
          html.style.filter = '';
          focusOverlay.style.display = '';
          guide.style.top = '';
          maskTop.style.height = '';
          maskBottom.style.height = '';
          localStorage.removeItem(STORAGE_KEY);
          return;
        }

        if (attr === 'fs-reset') {
          ['fs-sm','fs-lg','fs-xl'].forEach(function(a) {
            html.classList.remove('a11y-' + a);
            var el = document.querySelector('.a11y-feature[data-a11y="' + a + '"]');
            if (el) el.classList.remove('active');
          });
          saveState();
          return;
        }

        var isActive = btn.classList.contains('active');
        apply(attr, !isActive);
      });

      // --- Reading guide cursor tracking ---
      document.addEventListener('mousemove', function(e) {
        if (html.classList.contains('a11y-reading-guide-active')) {
          guide.style.top = (e.clientY - 1) + 'px';
        }
        if (html.classList.contains('a11y-reading-mask-active')) {
          var maskHeight = 80;
          var top = Math.max(0, e.clientY - maskHeight / 2);
          var bottom = Math.max(0, window.innerHeight - e.clientY - maskHeight / 2);
          maskTop.style.height = top + 'px';
          maskBottom.style.height = bottom + 'px';
        }
      });

      // --- Focus mode: highlight focused element ---
      document.addEventListener('focusin', function(e) {
        if (html.classList.contains('a11y-focus-mode')) {
          focusOverlay.style.display = 'block';
        }
      });
      document.addEventListener('focusout', function(e) {
        if (html.classList.contains('a11y-focus-mode')) {
          setTimeout(function() {
            if (!document.activeElement || document.activeElement === document.body) {
              focusOverlay.style.display = 'none';
            }
          }, 100);
        }
      });
      // Override for focus mode click
      document.addEventListener('click', function(e) {
        if (html.classList.contains('a11y-focus-mode') && e.target) {
          focusOverlay.style.display = 'block';
        }
      });

      // --- Restore saved state ---
      Object.keys(saved).forEach(function(key) {
        if (saved[key]) {
          apply(key, true);
        }
      });

      // --- Handle grayscale + saturate conflict ---
      // when grayscale is on, saturate is disabled, and vice versa - handled naturally by filter override

      // --- Additional helpers ---
      // Focus mode: provide keyboard hint
      if (html.classList.contains('a11y-focus-mode')) {
        // already handled
      }

    })();

    // ===================== COMING SOON SHARED =====================
    function showComingSoon(name) {
      var existing = document.querySelector('.coming-soon-toast');
      if (existing) existing.remove();
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.4);backdrop-filter:blur(4px);z-index:5000;display:flex;align-items:center;justify-content:center;padding:16px;animation:fadeIn 0.2s ease';
      var toast = document.createElement('div');
      toast.className = 'coming-soon-toast';
      toast.style.cssText = 'background:var(--bg-card);border-radius:var(--radius-lg);padding:32px 40px;box-shadow:var(--shadow-xl);text-align:center;max-width:380px;width:100%;border:2px dashed var(--border-color);animation:popupScaleIn 0.3s ease;';
      toast.innerHTML =
        '<div style="font-size:2.5rem;margin-bottom:12px">🚧</div>' +
        '<h3 style="margin-bottom:4px">' + name + ' Coming Soon</h3>' +
        '<p style="color:var(--text-tertiary);font-size:0.9rem;margin-bottom:16px">We\'re building something awesome. Stay tuned!</p>' +
        '<button class="btn btn-primary" style="margin:0 auto;justify-content:center" onclick="this.closest(\'.coming-soon-toast\').parentElement.remove()">Got it</button>';
      overlay.appendChild(toast);
      document.body.appendChild(overlay);
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) { overlay.remove(); }
      });
    }
    window.showComingSoon = showComingSoon;

    // Expose for inline use
    window.showLeadForm = function () {
      document.getElementById('lead-modal').classList.add('open');
    };
    window.showQuoteForm = function () {
      document.getElementById('quote-modal').classList.add('open');
    };

    // ===================== CONTACT FORM VALIDATION =====================
    (function contactValidation() {
      var form = document.getElementById('contact-form');
      if (!form) return;
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var valid = true;
        var fields = [
          { el: form.querySelector('[name="name"]'), msg: 'Please enter your name' },
          { el: form.querySelector('[name="email"]'), msg: 'Please enter a valid email' },
          { el: form.querySelector('[name="subject"]'), msg: 'Please enter a subject' },
          { el: form.querySelector('[name="message"]'), msg: 'Please enter your message' }
        ];
        var phoneField = form.querySelector('[name="phone"]');

        fields.forEach(function (f) {
          var group = f.el ? f.el.closest('.form-group') : null;
          if (group) group.classList.remove('error');
          if (f.el && !f.el.value.trim()) {
            if (group) {
              group.classList.add('error');
              var err = group.querySelector('.contact-validation-error');
              if (err) err.textContent = f.msg;
            }
            valid = false;
          }
          if (f.el && f.el.name === 'email' && f.el.value.trim()) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(f.el.value.trim())) {
              if (group) {
                group.classList.add('error');
                var err = group.querySelector('.contact-validation-error');
                if (err) err.textContent = 'Please enter a valid email address';
              }
              valid = false;
            }
          }
        });

        if (valid) {
          var successMsg = form.querySelector('.form-success-msg');
          if (successMsg) {
            successMsg.classList.add('show');
            successMsg.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.';
          }
          form.reset();
        }
      });
    })();

    // ===================== SERVICE COMPARISON =====================
    // Add comparison section if on home/about page
    (function serviceComparison() {
      var target = document.getElementById('service-comparison');
      if (target) {
        // Already exists in HTML
        return;
      }
      // Auto-inject if comparison section placeholder exists
      var placeholder = document.querySelector('[data-section="comparison"]');
      if (placeholder) {
        populateComparison(placeholder);
      }
    })();

    function populateComparison(container) {
      container.innerHTML =
        '<div class="section-header">' +
          '<span class="section-tag">Compare</span>' +
          '<h2 class="section-title">Service Comparison</h2>' +
          '<p class="section-description">See how our services stack up against each other to choose the right fit for your business.</p>' +
        '</div>' +
        '<div class="comparison-table-wrapper">' +
          '<table class="comparison-table">' +
            '<thead><tr><th>Feature</th><th>Social Media Marketing</th><th>Graphics Design</th><th>Landing Page Design</th><th>Full Package</th></tr></thead>' +
            '<tbody>' +
              '<tr><td>Strategy & Planning</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td><td class="check">✓</td></tr>' +
              '<tr><td>Content Creation</td><td class="check">✓</td><td class="check">✓</td><td class="cross">✗</td><td class="check">✓</td></tr>' +
              '<tr><td>Platform Management</td><td class="check">✓</td><td class="cross">✗</td><td class="cross">✗</td><td class="check">✓</td></tr>' +
              '<tr><td>Ad Campaign Management</td><td class="check">✓</td><td class="cross">✗</td><td class="cross">✗</td><td class="check">✓</td></tr>' +
              '<tr><td>Brand Identity Design</td><td class="cross">✗</td><td class="check">✓</td><td class="cross">✗</td><td class="check">✓</td></tr>' +
              '<tr><td>Responsive Development</td><td class="cross">✗</td><td class="cross">✗</td><td class="check">✓</td><td class="check">✓</td></tr>' +
              '<tr><td>SEO Optimization</td><td class="check">✓</td><td class="cross">✗</td><td class="check">✓</td><td class="check">✓</td></tr>' +
              '<tr><td>Analytics & Reporting</td><td class="check">✓</td><td class="cross">✗</td><td class="check">✓</td><td class="check">✓</td></tr>' +
              '<tr><td>Ongoing Support</td><td class="check">✓</td><td class="check">✓</td><td class="cross">✗</td><td class="check">✓</td></tr>' +
              '<tr><td>Dedicated Account Manager</td><td class="cross">✗</td><td class="cross">✗</td><td class="cross">✗</td><td class="check">✓</td></tr>' +
            '</tbody>' +
          '</table>' +
        '</div>';
    }

    // ===================== HELPER: Form Success =====================
    function showFormSuccess(form) {
      var existing = form.querySelector('.form-success-msg');
      if (existing) {
        existing.classList.add('show');
        return;
      }
      var msg = document.createElement('div');
      msg.className = 'form-success-msg show';
      msg.textContent = 'Thank you! We\'ll be in touch soon.';
      form.appendChild(msg);
      setTimeout(function () { msg.classList.remove('show'); }, 4000);
    }

    // ===================== 2. SHARE PAGE =====================
    (function sharePage() {
      if (document.querySelector('.share-modal-overlay')) return;

      var overlay = document.createElement('div');
      overlay.className = 'share-modal-overlay';
      overlay.id = 'share-modal';
      var url = encodeURIComponent(window.location.href);
      var text = encodeURIComponent(document.title);
      overlay.innerHTML =
        '<div class="share-modal">' +
          '<div class="share-modal-header">' +
            '<h3 data-i18n="share.title">Share this page</h3>' +
            '<button class="share-modal-close" aria-label="Close">&times;</button>' +
          '</div>' +
          '<div class="share-grid">' +
            '<button class="share-btn share-btn-copy" data-share="copy"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> <span data-i18n="share.copy">Copy Link</span></button>' +
            '<a class="share-btn share-btn-facebook" href="https://www.facebook.com/sharer/sharer.php?u=' + url + '" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> <span data-i18n="share.facebook">Facebook</span></a>' +
            '<a class="share-btn share-btn-linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=' + url + '" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> <span data-i18n="share.linkedin">LinkedIn</span></a>' +
            '<a class="share-btn share-btn-twitter" href="https://twitter.com/intent/tweet?text=' + text + '&url=' + url + '" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg> <span data-i18n="share.twitter">X (Twitter)</span></a>' +
          '</div>' +
          '<div class="share-copy-feedback" id="share-copy-feedback" data-i18n="share.copied">Link copied!</div>' +
        '</div>';
      document.body.appendChild(overlay);

      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) overlay.classList.remove('open');
      });
      overlay.querySelector('.share-modal-close').addEventListener('click', function() {
        overlay.classList.remove('open');
      });
      overlay.querySelector('[data-share="copy"]').addEventListener('click', function() {
        navigator.clipboard.writeText(window.location.href).then(function() {
          var fb = overlay.querySelector('#share-copy-feedback');
          fb.classList.add('show');
          setTimeout(function() { fb.classList.remove('show'); }, 2500);
        });
      });
      // Native share
      if (navigator.share) {
        var nativeBtn = document.createElement('button');
        nativeBtn.className = 'share-btn';
        nativeBtn.innerHTML = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> <span data-i18n="share.native">More...</span>';
        nativeBtn.addEventListener('click', function() {
          navigator.share({ title: document.title, url: window.location.href });
          overlay.classList.remove('open');
        });
        overlay.querySelector('.share-grid').appendChild(nativeBtn);
      }

      // Inject share trigger into mobile menu
      var mobileActions = document.querySelector('.mobile-nav-actions');
      if (mobileActions) {
        var mobTrigger = document.createElement('button');
        mobTrigger.className = 'share-trigger mobile-share-trigger';
        mobTrigger.setAttribute('aria-label', 'Share this page');
        mobTrigger.innerHTML = '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> Share';
        mobTrigger.addEventListener('click', function() {
          overlay.classList.add('open');
          // Close mobile menu
          var mm = document.querySelector('.mobile-menu');
          if (mm) mm.classList.remove('open');
          document.body.style.overflow = '';
        });
        mobileActions.parentNode.insertBefore(mobTrigger, mobileActions);
      }

      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') overlay.classList.remove('open');
      });
    })();

    // ===================== 3. SUCCESS ANIMATION =====================
    (function successAnimation() {
      var overlay = document.createElement('div');
      overlay.className = 'success-overlay';
      overlay.id = 'success-animation-overlay';
      overlay.innerHTML =
        '<div class="success-popup">' +
          '<div class="success-checkmark">' +
            '<svg viewBox="0 0 24 24" stroke="#fff" stroke-width="3" fill="none"><polyline points="4 12 9 17 20 6"/></svg>' +
          '</div>' +
          '<h3>Success!</h3>' +
          '<p>Thank you! We\'ll be in touch soon.</p>' +
        '</div>';
      document.body.appendChild(overlay);

      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) hideSuccess();
      });

      var timeoutId = null;

      function hideSuccess() {
        overlay.classList.remove('open');
        if (timeoutId) { clearTimeout(timeoutId); timeoutId = null; }
        document.body.style.overflow = '';
      }

      function showSuccessMessage(msg) {
        var popup = overlay.querySelector('.success-popup');
        var p = popup.querySelector('p');
        if (msg) p.textContent = msg;
        else p.textContent = 'Thank you! We\'ll be in touch soon.';
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(hideSuccess, 3500);
      }

      // Override existing showFormSuccess — all form handlers already call it
      window.showFormSuccess = showSuccessMessage;
      window.hideSuccessAnimation = hideSuccess;
    })();

    // ===================== 4. VOICE SEARCH COMING SOON =====================
    (function voiceSearchComingSoon() {
      var searchOverlay = document.querySelector('.search-modal-results');
      if (!searchOverlay) return;

      // Add voice search card as last item in search results
      var card = document.createElement('div');
      card.className = 'voice-search-card';
      card.id = 'voice-search-card';
      card.style.display = 'none';
      card.innerHTML =
        '<div class="voice-search-icon">' +
          '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>' +
        '</div>' +
        '<div class="voice-search-info">' +
          '<h4>Voice Search <span class="voice-search-badge">Coming Soon</span></h4>' +
          '<p>Search using your voice. Just tap the microphone and speak your query. This feature is on its way!</p>' +
        '</div>';
      searchOverlay.parentNode.appendChild(card);

      // Show voice search card when search overlay has no results
      var searchInput = document.getElementById('search-input');
      var resultsDiv = searchOverlay;
      if (searchInput) {
        searchInput.addEventListener('input', function() {
          var q = searchInput.value.toLowerCase().trim();
          var hasResults = resultsDiv.querySelector('.search-result-item');
          if (q && !hasResults) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
        searchInput.addEventListener('focus', function() {
          if (searchInput.value.trim() && !resultsDiv.querySelector('.search-result-item')) {
            card.style.display = 'flex';
          }
        });
      }

      // Also handle existing no-results
      var observer = new MutationObserver(function() {
        var q = searchInput ? searchInput.value.toLowerCase().trim() : '';
        var hasResults = resultsDiv.querySelector('.search-result-item');
        card.style.display = (q && !hasResults) ? 'flex' : 'none';
      });
      if (resultsDiv) observer.observe(resultsDiv, { childList: true, subtree: true });
    })();

    // ===================== 5. TEXT TO SPEECH (A11Y PANEL) =====================
    (function textToSpeech() {
      var panel = document.getElementById('a11y-panel');
      if (!panel) return;

      var ttsSection = document.createElement('div');
      ttsSection.className = 'a11y-group';
      ttsSection.innerHTML =
        '<div class="a11y-group-label">Text to Speech</div>' +
        '<div class="a11y-tts-controls">' +
          '<button class="a11y-tts-btn" data-tts="play" aria-label="Play"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><polygon points="5 3 19 12 5 21 5 3"/></svg> Play</button>' +
          '<button class="a11y-tts-btn" data-tts="pause" aria-label="Pause"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause</button>' +
          '<button class="a11y-tts-btn" data-tts="resume" aria-label="Resume"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><polygon points="5 3 19 12 5 21 5 3"/></svg> Resume</button>' +
          '<button class="a11y-tts-btn" data-tts="stop" aria-label="Stop"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><rect x="4" y="4" width="16" height="16"/></svg> Stop</button>' +
        '</div>' +
        '<div class="a11y-tts-sliders">' +
          '<div class="a11y-tts-slider-group">' +
            '<label for="tts-speed">Speed: <span id="tts-speed-val">1x</span></label>' +
            '<input type="range" id="tts-speed" min="0.25" max="3" step="0.25" value="1">' +
          '</div>' +
          '<div class="a11y-tts-slider-group">' +
            '<label for="tts-volume">Volume: <span id="tts-vol-val">100%</span></label>' +
            '<input type="range" id="tts-volume" min="0" max="1" step="0.1" value="1">' +
          '</div>' +
        '</div>' +
        '<div class="a11y-tts-status" id="tts-status">Ready</div>';

      // Insert before reset button
      var resetBtn = panel.querySelector('.a11y-feature-reset');
      if (resetBtn) {
        resetBtn.parentNode.insertBefore(ttsSection, resetBtn);
      } else {
        panel.appendChild(ttsSection);
      }

      var synth = window.speechSynthesis;
      var utterance = null;
      var isPaused = false;
      var statusEl = document.getElementById('tts-status');
      var speedEl = document.getElementById('tts-speed');
      var volEl = document.getElementById('tts-volume');
      var speedVal = document.getElementById('tts-speed-val');
      var volVal = document.getElementById('tts-vol-val');

      if (speedVal && speedEl) {
        speedEl.addEventListener('input', function() {
          speedVal.textContent = speedEl.value + 'x';
          if (utterance) { utterance.rate = parseFloat(speedEl.value); }
        });
      }
      if (volVal && volEl) {
        volEl.addEventListener('input', function() {
          volVal.textContent = Math.round(parseFloat(volEl.value) * 100) + '%';
          if (utterance) { utterance.volume = parseFloat(volEl.value); }
        });
      }

      function getPageText() {
        var els = document.querySelectorAll('h1, h2, h3, h4, p, li, .section-tag, .section-title, .section-description, .nav-link, .btn-hire, .footer-brand p, .footer-column li, .faq-question span, .faq-answer p');
        var texts = [];
        els.forEach(function(el) {
          var t = el.textContent.trim();
          if (t && t.length > 3) texts.push(t);
        });
        return texts.join('. ');
      }

      ttsSection.addEventListener('click', function(e) {
        var btn = e.target.closest('[data-tts]');
        if (!btn) return;
        var action = btn.dataset.tts;
        if (action === 'play') {
          if (synth.speaking && !synth.paused) return;
          if (synth.paused) { synth.resume(); statusEl.textContent = 'Playing...'; return; }
          synth.cancel();
          var text = getPageText();
          if (!text) { statusEl.textContent = 'No content to read'; return; }
          utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = parseFloat(speedEl ? speedEl.value : '1');
          utterance.volume = parseFloat(volEl ? volEl.value : '1');
          utterance.lang = document.documentElement.lang || 'en';
          utterance.onstart = function() { statusEl.textContent = 'Playing...'; };
          utterance.onpause = function() { statusEl.textContent = 'Paused'; };
          utterance.onresume = function() { statusEl.textContent = 'Playing...'; };
          utterance.onend = function() { statusEl.textContent = 'Finished'; isPaused = false; };
          utterance.onerror = function() { statusEl.textContent = 'Error occurred'; isPaused = false; };
          synth.speak(utterance);
          isPaused = false;
        } else if (action === 'pause') {
          if (synth.speaking && !synth.paused) {
            synth.pause();
            isPaused = true;
            statusEl.textContent = 'Paused';
          }
        } else if (action === 'resume') {
          if (synth.paused) {
            synth.resume();
            isPaused = false;
            statusEl.textContent = 'Playing...';
          } else if (!synth.speaking && utterance) {
            // Re-speak
            synth.speak(utterance);
            statusEl.textContent = 'Playing...';
          }
        } else if (action === 'stop') {
          synth.cancel();
          isPaused = false;
          statusEl.textContent = 'Stopped';
        }
      });
    })();

    // ===================== 6. SMART SEARCH + SUGGESTIONS =====================
    (function smartSearch() {
      var searchInput = document.getElementById('search-input');
      if (!searchInput) return;

      // Extended search data (add more entries)
      var existingSearchData = window._searchData || [];
      // Inject additional team, blog, pricing entries via existing data
      var extendedItems = [
        { label: 'Digital Marketing Strategy', url: 'index.html#services', cat: 'Services' },
        { label: 'Brand Identity Design', url: 'portfolio.html', cat: 'Portfolio' },
        { label: 'UI/UX Design', url: 'portfolio.html', cat: 'Services' },
        { label: 'Content Marketing', url: 'blog.html', cat: 'Services' },
        { label: 'Email Marketing', url: 'contact.html#calculators', cat: 'Services' },
        { label: 'Web Development', url: 'portfolio.html', cat: 'Services' },
        { label: 'Search Engine Optimization', url: 'portfolio.html', cat: 'Services' },
        { label: 'Pay Per Click Advertising', url: 'portfolio.html', cat: 'Services' },
        { label: 'Social Media Management', url: 'portfolio.html', cat: 'Services' },
        { label: 'Influencer Marketing', url: 'portfolio.html', cat: 'Services' },
        { label: 'Startup Package', url: 'contact.html#calculators', cat: 'Pricing' },
        { label: 'Business Package', url: 'contact.html#calculators', cat: 'Pricing' },
        { label: 'Enterprise Package', url: 'contact.html#calculators', cat: 'Pricing' },
        { label: 'Team Member - Abhishek', url: 'about.html', cat: 'Team' },
        { label: 'Team Member - Design Team', url: 'about.html', cat: 'Team' },
        { label: 'Team Member - Marketing Team', url: 'about.html', cat: 'Team' },
        { label: 'Latest Blog Posts', url: 'blog.html', cat: 'Blog' },
        { label: 'Digital Marketing Trends', url: 'blog.html', cat: 'Blog' },
        { label: 'Design Tips & Tricks', url: 'blog.html', cat: 'Blog' },
        { label: 'How We Work', url: 'about.html', cat: 'Pages' },
        { label: 'Our Mission & Vision', url: 'about.html', cat: 'Pages' },
        { label: 'Client Testimonials', url: 'index.html#testimonials', cat: 'Pages' },
        { label: 'Careers at Pentora Digital', url: 'careers.html', cat: 'Pages' },
        { label: 'Cookie Policy Details', url: 'cookie-policy.html', cat: 'Policies' },
        { label: 'Privacy Policy Details', url: 'privacy.html', cat: 'Policies' },
        { label: 'Terms of Service Details', url: 'terms.html', cat: 'Policies' },
        { label: 'ROI Calculator', url: 'contact.html#calculators', cat: 'Pricing' },
        { label: 'Pricing Calculator', url: 'contact.html#calculators', cat: 'Pricing' },
        { label: 'Free Consultation', url: 'contact.html', cat: 'Contact' },
        { label: 'Request a Quote', url: 'contact.html', cat: 'Contact' },
      ];

      // Create suggestions container
      var suggestionsContainer = document.createElement('div');
      suggestionsContainer.className = 'search-suggestions';
      suggestionsContainer.id = 'search-suggestions';
      searchInput.parentNode.appendChild(suggestionsContainer);

      var suggestionsData = [
        { label: 'Landing Page', icon: 'layout' },
        { label: 'Graphic Design', icon: 'edit' },
        { label: 'Social Media Marketing', icon: 'share' },
        { label: 'Digital Marketing', icon: 'trending' },
        { label: 'SEO', icon: 'search' },
        { label: 'Portfolio', icon: 'grid' },
        { label: 'Contact', icon: 'mail' },
        { label: 'Pricing', icon: 'dollar' },
        { label: 'FAQ', icon: 'help' },
        { label: 'Blog', icon: 'file' },
      ];

      var suggestionIcons = {
        layout: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/></svg>',
        edit: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
        share: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 4v16h16"/><polyline points="20 10 20 4 14 4"/><line x1="4" y1="20" x2="20" y2="4"/></svg>',
        trending: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
        search: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
        grid: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
        mail: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
        dollar: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
        help: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        file: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
      };

      var suggestionHighlightIndex = -1;

      function showSuggestions(q) {
        suggestionsContainer.innerHTML = '';
        suggestionHighlightIndex = -1;
        if (!q || q.length < 1) { suggestionsContainer.classList.remove('show'); return; }
        var matches = suggestionsData.filter(function(s) {
          return s.label.toLowerCase().indexOf(q) !== -1;
        });
        if (matches.length === 0) { suggestionsContainer.classList.remove('show'); return; }
        matches.forEach(function(m) {
          var item = document.createElement('button');
          item.className = 'search-suggestion-item';
          item.type = 'button';
          item.innerHTML = (suggestionIcons[m.icon] || suggestionIcons.search) +
            '<span>' + m.label + '</span>';
          item.addEventListener('click', function() {
            searchInput.value = m.label;
            suggestionsContainer.classList.remove('show');
            searchInput.dispatchEvent(new Event('input'));
          });
          suggestionsContainer.appendChild(item);
        });
        suggestionsContainer.classList.add('show');
      }

      searchInput.addEventListener('input', function() {
        var q = searchInput.value.toLowerCase().trim();
        showSuggestions(q);
      });

      searchInput.addEventListener('keydown', function(e) {
        var items = suggestionsContainer.querySelectorAll('.search-suggestion-item');
        if (items.length === 0) return;
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          suggestionHighlightIndex = Math.min(suggestionHighlightIndex + 1, items.length - 1);
          items.forEach(function(el, i) { el.classList.toggle('highlighted', i === suggestionHighlightIndex); });
          if (suggestionHighlightIndex >= 0) items[suggestionHighlightIndex].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          suggestionHighlightIndex = Math.max(suggestionHighlightIndex - 1, -1);
          items.forEach(function(el, i) { el.classList.toggle('highlighted', i === suggestionHighlightIndex); });
          if (suggestionHighlightIndex >= 0) items[suggestionHighlightIndex].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter' && suggestionHighlightIndex >= 0) {
          e.preventDefault();
          items[suggestionHighlightIndex].click();
        } else if (e.key === 'Escape') {
          suggestionsContainer.classList.remove('show');
        }
      });

      searchInput.addEventListener('blur', function() {
        setTimeout(function() { suggestionsContainer.classList.remove('show'); }, 200);
      });

      searchInput.addEventListener('focus', function() {
        var q = searchInput.value.toLowerCase().trim();
        if (q) showSuggestions(q);
      });
    })();

    // ===================== 7. CLIENT LOGO MARQUEE =====================
    (function clientLogoMarquee() {
      var section = document.querySelector('[data-section="clients"]');
      if (!section) return;

      var logos = [
        { label: 'TechCorp', color: '#6c3ce0' },
        { label: 'DesignLab', color: '#00d4aa' },
        { label: 'MarketPro', color: '#f59e0b' },
        { label: 'Brandify', color: '#ef4444' },
        { label: 'WebCraft', color: '#3b82f6' },
        { label: 'PixelStudio', color: '#ec4899' },
        { label: 'DataDriven', color: '#10b981' },
        { label: 'CloudBase', color: '#8b5cf6' },
      ];

      var wrapper = document.createElement('div');
      wrapper.className = 'client-marquee-wrapper';

      var track = document.createElement('div');
      track.className = 'client-marquee-track';

      function createLogo(l) {
        return '<div class="client-marquee-item"><span style="color:' + l.color + ';font-size:1.2rem;">' + l.label + '</span></div>';
      }

      // Double the logos for seamless loop
      var allLogos = logos.concat(logos);
      allLogos.forEach(function(l) {
        var div = document.createElement('div');
        div.innerHTML = createLogo(l);
        track.appendChild(div.firstElementChild);
      });

      wrapper.appendChild(track);
      section.appendChild(wrapper);

      // Pause on hover
      track.addEventListener('mouseenter', function() { track.style.animationPlayState = 'paused'; });
      track.addEventListener('mouseleave', function() { track.style.animationPlayState = 'running'; });
    })();

    // ===================== 8. INTERACTIVE WORLD MAP =====================
    (function interactiveWorldMap() {
      var section = document.querySelector('[data-section="world-map"]');
      if (!section) return;

      // Demo data
      var locations = [
        { x: '20%', y: '35%', country: 'United States', projects: 28 },
        { x: '45%', y: '30%', country: 'United Kingdom', projects: 15 },
        { x: '52%', y: '38%', country: 'Germany', projects: 12 },
        { x: '38%', y: '40%', country: 'UAE', projects: 8 },
        { x: '55%', y: '48%', country: 'India', projects: 22 },
        { x: '65%', y: '42%', country: 'Bangladesh', projects: 18 },
        { x: '18%', y: '55%', country: 'Brazil', projects: 6 },
        { x: '85%', y: '35%', country: 'Australia', projects: 10 },
        { x: '28%', y: '20%', country: 'Canada', projects: 14 },
        { x: '42%', y: '50%', country: 'Nigeria', projects: 5 },
      ];

      var container = section.querySelector('.world-map-container');
      if (!container) return;

      // Create tooltip
      var tooltip = document.createElement('div');
      tooltip.className = 'map-location-tooltip';
      container.appendChild(tooltip);

      // Add dots
      locations.forEach(function(loc) {
        var dot = document.createElement('div');
        dot.style.cssText = 'position:absolute;left:' + loc.x + ';top:' + loc.y + ';width:14px;height:14px;margin:-7px 0 0 -7px;background:var(--primary);border:3px solid var(--bg-primary);border-radius:50%;cursor:pointer;box-shadow:0 0 0 4px var(--primary-glow);transition:transform 0.2s;';
        dot.addEventListener('mouseenter', function(e) {
          dot.style.transform = 'scale(1.4)';
          tooltip.innerHTML = '<div class="map-tooltip-country">' + loc.country + '</div><div class="map-tooltip-projects">' + loc.projects + ' projects</div>';
          tooltip.classList.add('show');
          tooltip.style.left = loc.x;
          tooltip.style.top = 'calc(' + loc.y + ' + 12px)';
        });
        dot.addEventListener('mouseleave', function() {
          dot.style.transform = 'scale(1)';
          tooltip.classList.remove('show');
        });
        container.appendChild(dot);
      });

      // Stats
      var statsContainer = section.querySelector('.map-stats-grid');
      if (statsContainer) {
        var totalProjects = locations.reduce(function(sum, l) { return sum + l.projects; }, 0);
        var stats = [
          { value: locations.length, label: 'Countries Served' },
          { value: totalProjects, label: 'Projects Delivered' },
          { value: '24/7', label: 'Client Support' },
        ];
        statsContainer.innerHTML = '';
        stats.forEach(function(s) {
          var card = document.createElement('div');
          card.className = 'map-stat-card';
          card.innerHTML = '<h3>' + s.value + '</h3><p>' + s.label + '</p>';
          statsContainer.appendChild(card);
        });
      }
    })();

    // ===================== 9. HOLIDAY NOTICE =====================
    (function holidayNotice() {
      if (document.querySelector('.holiday-notice')) return;
      var HIDDEN_KEY = 'pentora_holiday_hidden';
      if (localStorage.getItem(HIDDEN_KEY)) return;

      // Editable holiday message
      var notice = document.createElement('div');
      notice.className = 'holiday-notice show';
      notice.setAttribute('data-i18n', 'holiday.message');
      notice.innerHTML =
        '<span>We are closed for Eid Holidays. Orders placed during this time will be processed after the holidays. <strong>Eid Mubarak!</strong></span>' +
        '<button class="holiday-notice-close" aria-label="Dismiss notice">&times;</button>';

      // Insert after announcement bar or at top of body
      var annBar = document.querySelector('.announcement-bar');
      if (annBar) {
        annBar.parentNode.insertBefore(notice, annBar.nextSibling);
      } else {
        var body = document.body;
        body.insertBefore(notice, body.firstChild);
      }
      recalcBannerOffset();

      notice.querySelector('.holiday-notice-close').addEventListener('click', function() {
        notice.classList.remove('show');
        notice.style.display = 'none';
        localStorage.setItem(HIDDEN_KEY, '1');
        recalcBannerOffset();
      });
    })();

    // ===================== 10. CAREERS COMING SOON =====================
    (function careersComingSoon() {
      // Detect if we're on careers page
      if (window.location.pathname.indexOf('careers') === -1) return;

      // Hero animation
      var heroContent = document.querySelector('.careers-hero');
      if (heroContent) {
        heroContent.classList.add('fade-in', 'visible');
      }

      // Add coming soon badge to CTA buttons
      document.querySelectorAll('.careers-cta, .btn-apply').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          window.showComingSoon('Job applications');
        });
      });

      // Coming soon toast for apply buttons
      document.querySelectorAll('[data-careers="coming-soon"]').forEach(function(el) {
        el.addEventListener('click', function(e) {
          e.preventDefault();
          window.showComingSoon('This feature');
        });
      });
    })();

  // ===================== INTERACTIVE GLOBE =====================
  (function interactiveGlobe() {
    var section = document.querySelector('[data-section="globe"]');
    if (!section) return;

    var container = document.getElementById('globe-container');
    var dotsEl = document.getElementById('globe-dots');
    var linesEl = document.getElementById('globe-lines');
    var tooltipEl = document.getElementById('globe-tooltip');
    var statsEl = document.getElementById('globe-stats');

    var size = container.offsetWidth || 380;
    var cx = size / 2;
    var cy = size / 2;
    var radius = size / 2 - 14;

    var locations = [
      { lat: 23.6850, lng: 90.3563, country: 'Bangladesh', projects: 14, status: 'Active', flag: '🇧🇩' },
      { lat: 20.5937, lng: 78.9629, country: 'India', projects: 8, status: 'Active', flag: '🇮🇳' },
      { lat: 37.0902, lng: -95.7129, country: 'United States', projects: 12, status: 'Active', flag: '🇺🇸' },
      { lat: 55.3781, lng: -3.4360, country: 'United Kingdom', projects: 6, status: 'Active', flag: '🇬🇧' },
      { lat: 56.1304, lng: -106.3468, country: 'Canada', projects: 5, status: 'Active', flag: '🇨🇦' },
      { lat: -25.2744, lng: 133.7751, country: 'Australia', projects: 7, status: 'Active', flag: '🇦🇺' },
      { lat: 51.1657, lng: 10.4515, country: 'Germany', projects: 4, status: 'Active', flag: '🇩🇪' },
      { lat: 46.6034, lng: 1.8883, country: 'France', projects: 3, status: 'Active', flag: '🇫🇷' },
      { lat: 35.6762, lng: 139.6503, country: 'Japan', projects: 9, status: 'Active', flag: '🇯🇵' },
      { lat: 1.3521, lng: 103.8198, country: 'Singapore', projects: 5, status: 'Active', flag: '🇸🇬' },
    ];

    function project(lat, lng) {
      var phi = lat * Math.PI / 180;
      var lambda = lng * Math.PI / 180;
      return {
        x: cx + radius * Math.cos(phi) * Math.sin(lambda),
        y: cy - radius * Math.sin(phi)
      };
    }

    // Draw dots
    var dotEls = [];
    locations.forEach(function(loc) {
      var p = project(loc.lat, loc.lng);
      if (p.x < 10 || p.x > size - 10 || p.y < 10 || p.y > size - 10) return;

      var dot = document.createElement('div');
      dot.className = 'globe-dot';
      dot.style.left = p.x + 'px';
      dot.style.top = p.y + 'px';

      var inner = document.createElement('div');
      inner.className = 'globe-dot-inner';
      dot.appendChild(inner);

      var label = document.createElement('div');
      label.className = 'globe-dot-label';
      label.textContent = loc.country;
      dot.appendChild(label);

      dot.addEventListener('mouseenter', function(e) {
        tooltipEl.innerHTML =
          '<div class="globe-tooltip-country">' + loc.flag + ' ' + loc.country + '</div>' +
          '<div class="globe-tooltip-projects">' + loc.projects + ' projects delivered</div>' +
          '<div class="globe-tooltip-status"><svg viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="3"/></svg>' + loc.status + '</div>';
        tooltipEl.style.left = (p.x + 14) + 'px';
        tooltipEl.style.top = (p.y - 10) + 'px';
        tooltipEl.classList.add('show');
      });
      dot.addEventListener('mouseleave', function() {
        tooltipEl.classList.remove('show');
      });

      dotsEl.appendChild(dot);
      dotEls.push({ el: dot, x: p.x, y: p.y, loc: loc });
    });

    // Draw connection lines between all pairs
    var svgNs = 'http://www.w3.org/2000/svg';
    for (var i = 0; i < dotEls.length; i++) {
      for (var j = i + 1; j < dotEls.length; j++) {
        var a = dotEls[i], b = dotEls[j];
        var dx = b.x - a.x;
        if (Math.abs(dx) > radius) continue; // skip lines that cross the back
        var midX = (a.x + b.x) / 2;
        var midY = (a.y + b.y) / 2 - 20;
        var line = document.createElementNS(svgNs, 'path');
        line.setAttribute('d', 'M' + a.x + ',' + a.y + ' Q' + midX + ',' + midY + ' ' + b.x + ',' + b.y);
        linesEl.appendChild(line);
      }
    }

    // Stats cards
    var stats = [
      { value: '10', label: 'Countries Reached', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
      { value: '73', label: 'Projects Done', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>' },
      { value: '24/7', label: 'Client Support', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' },
    ];

    stats.forEach(function(s) {
      var card = document.createElement('div');
      card.className = 'globe-stat-card';
      card.innerHTML =
        '<div class="globe-stat-icon">' + s.icon + '</div>' +
        '<h3>' + s.value + '</h3>' +
        '<p>' + s.label + '</p>';
      statsEl.appendChild(card);
    });
  })();

  // ===================== PUSH NOTIFICATIONS COMING SOON =====================
  (function pushNotifComingSoon() {
    var card = document.querySelector('.push-notif-card');
    if (!card) return;
    card.addEventListener('click', function() {
      if (typeof window.showComingSoon === 'function') {
        window.showComingSoon('Push notifications');
      }
    });
  })();

  }); // end DOMContentLoaded
})();
