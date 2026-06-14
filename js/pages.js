/* YouAsk — shared behaviour for sub-pages */
(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    /* sticky nav shadow */
    var nav = document.querySelector(".nav");
    if (nav) {
      var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 8); };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* back to top */
    var toTop = document.getElementById("toTop");
    if (toTop) {
      var toggleTop = function () { toTop.classList.toggle("show", window.scrollY > 480); };
      toggleTop();
      window.addEventListener("scroll", toggleTop, { passive: true });
      toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    }

    /* scroll reveal */
    var reveals = document.querySelectorAll(".reveal");
    if (reveals.length) {
      if (!("IntersectionObserver" in window)) {
        reveals.forEach(function (el) { el.classList.add("in"); });
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
          });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        reveals.forEach(function (el) { io.observe(el); });
      }
    }

    /* FAQ accordion (works on Policy too if present) */
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var q = item.querySelector(".faq-q");
      if (!q) return;
      q.addEventListener("click", function () {
        var open = item.classList.contains("open");
        item.classList.toggle("open", !open);
        var ans = item.querySelector(".faq-a");
        if (ans) ans.style.maxHeight = open ? "0px" : (ans.scrollHeight + 40) + "px";
      });
    });

    /* FAQ live search */
    var search = document.getElementById("faqSearch");
    if (search) {
      var items = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));
      var countEl = document.getElementById("faqCount");
      var emptyEl = document.getElementById("faqEmpty");
      var total = items.length;
      var update = function () {
        var term = search.value.trim().toLowerCase();
        var shown = 0;
        items.forEach(function (it) {
          var txt = (it.getAttribute("data-text") || it.textContent).toLowerCase();
          var match = !term || txt.indexOf(term) !== -1;
          it.style.display = match ? "" : "none";
          if (match) shown++;
        });
        if (countEl) countEl.textContent = term
          ? (shown + " of " + total + " questions")
          : ("Showing all " + total + " questions");
        if (emptyEl) emptyEl.style.display = shown === 0 ? "block" : "none";
      };
      search.addEventListener("input", update);
      update();
    }

    /* TOC scrollspy */
    var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a[href^='#']"));
    if (tocLinks.length) {
      var sections = tocLinks
        .map(function (a) { return document.querySelector(a.getAttribute("href")); })
        .filter(Boolean);
      var spy = function () {
        var pos = window.scrollY + 140;
        var current = sections[0];
        sections.forEach(function (s) { if (s.offsetTop <= pos) current = s; });
        tocLinks.forEach(function (a) {
          a.classList.toggle("active", current && a.getAttribute("href") === "#" + current.id);
        });
      };
      spy();
      window.addEventListener("scroll", spy, { passive: true });
    }
  });
})();
