"use strict";

(function () {
  // Dark mode toggle
  var toggle = document.getElementById("dark-mode-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var html = document.documentElement;
      var isDark = html.classList.contains("dark");
      html.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "light" : "dark");
    });
  }

  // Mobile menu
  var menuBtn = document.getElementById("mobile-menu-btn");
  var mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Back to top
  var backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 400) {
          backToTop.style.opacity = "1";
          backToTop.style.pointerEvents = "auto";
        } else {
          backToTop.style.opacity = "0";
          backToTop.style.pointerEvents = "none";
        }
      },
      { passive: true }
    );

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Image lightbox for wallpaper grid
  var wallpaperItems = document.querySelectorAll(".wallpaper-item");
  if (wallpaperItems.length) {
    (function () {
      // Collect all images from all wallpaper items
      var images = [];
      wallpaperItems.forEach(function (item) {
        var img = item.querySelector("img");
        if (img) images.push(img);
      });

      if (!images.length) return;

      // Create overlay
      var overlay = document.createElement("div");
      overlay.className = "img-lightbox-overlay";
      overlay.innerHTML =
        '<button class="lightbox-nav prev" aria-label="Previous">&#x276E;</button>' +
        '<button class="lightbox-close" aria-label="Close">&times;</button>' +
        '<img class="lightbox-img" src="" alt="">' +
        '<span class="lightbox-counter"></span>' +
        '<button class="lightbox-nav next" aria-label="Next">&#x276F;</button>';
      document.body.appendChild(overlay);

      var lightboxImg = overlay.querySelector(".lightbox-img");
      var counter = overlay.querySelector(".lightbox-counter");
      var closeBtn = overlay.querySelector(".lightbox-close");
      var prevBtn = overlay.querySelector(".lightbox-nav.prev");
      var nextBtn = overlay.querySelector(".lightbox-nav.next");

      var currentIndex = -1;

      function open(index) {
        if (index < 0 || index >= images.length) return;
        currentIndex = index;
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.alt = images[currentIndex].alt || "";
        counter.textContent = currentIndex + 1 + " / " + images.length;
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
        preloadAdjacent(index);
      }

      function close() {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
        currentIndex = -1;
      }

      function prev() {
        if (currentIndex > 0) open(currentIndex - 1);
      }

      function next() {
        if (currentIndex < images.length - 1) open(currentIndex + 1);
      }

      // Preload adjacent images
      function preloadAdjacent(idx) {
        [idx - 1, idx + 1].forEach(function (i) {
          if (i >= 0 && i < images.length) {
            var link = document.createElement("link");
            link.rel = "preload";
            link.as = "image";
            link.href = images[i].src;
            document.head.appendChild(link);
          }
        });
      }

      // Click to open
      images.forEach(function (img, i) {
        img.addEventListener("click", function () {
          open(i);
        });
      });

      // Close handlers
      closeBtn.addEventListener("click", close);
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) close();
      });
      document.addEventListener("keydown", function (e) {
        if (!overlay.classList.contains("active")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      });

      // Navigation buttons
      prevBtn.addEventListener("click", prev);
      nextBtn.addEventListener("click", next);

      // Touch swipe support
      var touchStartX = 0;
      overlay.addEventListener("touchstart", function (e) {
        touchStartX = e.changedTouches[0].screenX;
      });
      overlay.addEventListener("touchend", function (e) {
        if (e.target.closest(".lightbox-close") || e.target.closest(".lightbox-nav")) return;
        var diff = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(diff) > 50) {
          diff > 0 ? prev() : next();
        }
      });
    })();
  }

  // Code copy buttons
  if (document.querySelector(".prose pre")) {
    document.querySelectorAll(".prose pre").forEach(function (pre) {
      var btn = document.createElement("button");
      btn.className =
        "code-copy-btn absolute top-2 right-2 px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity";
      btn.textContent = "Copy";
      btn.addEventListener("click", function () {
        var code = pre.querySelector("code");
        var text = code ? code.textContent : pre.textContent;
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = "Copied!";
          setTimeout(function () {
            btn.textContent = "Copy";
          }, 2000);
        });
      });
      pre.style.position = "relative";
      pre.classList.add("group");
      pre.appendChild(btn);
    });
  }
})();
