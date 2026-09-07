/* Buzz Vending — site behaviour. No dependencies. */
(function () {
  'use strict';

  var body = document.body;

  /* ---------------------------------------------------- mobile nav ----- */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = body.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      body.style.overflow = open ? 'hidden' : '';
    });

    // close when a real link is tapped
    nav.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (link && link.getAttribute('href') !== '#' && body.classList.contains('nav-open')) {
        body.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('nav-open')) {
        body.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
        burger.focus();
      }
    });
  }

  /* ------------------------------------------------ sticky header ------ */
  var header = document.querySelector('.site-header');

  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-solid', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --------------------------------------------- scroll reveal --------- */
  var reveals = document.querySelectorAll('.reveal');

  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, i) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
          setTimeout(function () { el.classList.add('in'); }, delay);
          io.unobserve(el);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('in'); });
    }
  }

  /* ------------------------------------------------- contact form ------ */
  var form = document.querySelector('form[data-enquiry]');

  if (form) {
    form.addEventListener('submit', function (e) {
      // Honeypot: silently drop obvious bots.
      var trap = form.querySelector('input[name="_gotcha"]');
      if (trap && trap.value) {
        e.preventDefault();
        return;
      }

      var action = form.getAttribute('action') || '';

      // Browsers no longer reliably handle `method="post"` to a mailto:
      // action, so build the message ourselves and hand the mail client a
      // properly encoded mailto: URL instead. Once a real form endpoint
      // (Formspree/Netlify) is set as the action, this branch is skipped
      // and the form posts normally.
      if (action.indexOf('mailto:') === 0) {
        e.preventDefault();

        var to = action.slice('mailto:'.length);
        var subjectField = form.querySelector('[name="_subject"]');
        var subject = subjectField ? subjectField.value : 'Website enquiry';
        var lines = [];

        Array.prototype.forEach.call(form.elements, function (el) {
          if (!el.name || el.name.charAt(0) === '_') return;
          if (el.type === 'submit' || el.type === 'button') return;
          if (el.type === 'checkbox' && !el.checked) return;
          if (!el.value) return;

          var labelEl = form.querySelector('label[for="' + el.id + '"]');
          var label = el.dataset.label ||
            (labelEl
              ? labelEl.textContent.replace(/\s*\*\s*$/, '').replace(/\(optional\)/i, '').trim()
              : el.name);

          lines.push(label + ': ' + el.value);
        });

        window.location.href = 'mailto:' + to +
          '?subject=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(lines.join('\n'));

        var note = form.querySelector('.form-note');
        if (note && !note.dataset.swapped) {
          note.dataset.swapped = '1';
          note.innerHTML = 'Your email app should now be open with the details filled in — ' +
            'just press send. If nothing happened, email us directly at ' +
            '<a href="mailto:' + to + '"><strong>' + to + '</strong></a>.';
        }
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.dataset.label = btn.textContent;
        btn.textContent = 'Sending…';
        // Re-enable if the browser blocks or the request fails to navigate.
        setTimeout(function () {
          btn.disabled = false;
          btn.textContent = btn.dataset.label;
        }, 8000);
      }
    });
  }

  /* --------------------------------------- sticky mobile CTA bar ------- */
  var mobileCta = document.querySelector('.mobile-cta');

  if (mobileCta) {
    var footer = document.querySelector('.site-footer');

    var toggleCta = function () {
      // Show once past the hero, hide again over the footer so it never
      // covers the footer links.
      var pastHero = window.scrollY > window.innerHeight * 0.6;
      var overFooter = footer
        ? footer.getBoundingClientRect().top < window.innerHeight - 40
        : false;
      mobileCta.classList.toggle('show', pastHero && !overFooter);
    };

    toggleCta();
    window.addEventListener('scroll', toggleCta, { passive: true });
    window.addEventListener('resize', toggleCta, { passive: true });
  }

  /* --------------------------------------------- footer year ----------- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
