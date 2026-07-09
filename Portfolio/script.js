document.addEventListener("DOMContentLoaded", function () {
  initializePortfolioViewSwitcher();
  initializeNavbarActiveState();
  initializeNavbarCollapseOnClick();
  initializeBackToTopButton();
});

/* =================================
 Portfolio View Switcher
================================= */

function initializePortfolioViewSwitcher() {
  const viewButtons = document.querySelectorAll("[data-view-btn]");
  const viewPanels = document.querySelectorAll("[data-view-panel]");
  const projectCards = document.querySelectorAll("[data-project-views]");
  const activeViewName = document.getElementById("active-view-name");

  if (!viewButtons.length || !viewPanels.length || !projectCards.length) {
      return;
  }

  function applyPortfolioView(viewName) {
      document.body.classList.remove("software-mode", "qa-mode");

      if (viewName === "qa") {
          document.body.classList.add("qa-mode");
      } else {
          document.body.classList.add("software-mode");
      }

      viewButtons.forEach(function (button) {
          const buttonView = button.getAttribute("data-view-btn");
          button.classList.toggle("active", buttonView === viewName);
      });

      viewPanels.forEach(function (panel) {
          const panelView = panel.getAttribute("data-view-panel");
          panel.classList.toggle("d-none", panelView !== viewName);
      });

      projectCards.forEach(function (card) {
          const supportedViews = card.getAttribute("data-project-views").split(" ");
          const shouldShow = supportedViews.includes(viewName);
          card.classList.toggle("is-hidden", !shouldShow);
      });

      if (activeViewName) {
          activeViewName.textContent = viewName === "qa"
              ? "QA / Software Testing View"
              : "Software Engineering View";
      }
  }

  viewButtons.forEach(function (button) {
      button.addEventListener("click", function () {
          const selectedView = button.getAttribute("data-view-btn");
          applyPortfolioView(selectedView);
      });
  });

  applyPortfolioView("software");
}

/* =================================
 Active Navbar Link on Scroll
================================= */

function initializeNavbarActiveState() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar .nav-link");

  if (!sections.length || !navLinks.length) {
      return;
  }

  function updateActiveNavLink() {
      let currentSectionId = "";

      sections.forEach(function (section) {
          const sectionTop = section.offsetTop - 120;

          if (window.scrollY >= sectionTop) {
              currentSectionId = section.getAttribute("id");
          }
      });

      navLinks.forEach(function (link) {
          const linkTarget = link.getAttribute("href");

          if (linkTarget === "#" + currentSectionId) {
              link.classList.add("active");
          } else {
              link.classList.remove("active");
          }
      });
  }

  window.addEventListener("scroll", updateActiveNavLink);
  updateActiveNavLink();
}

/* =================================
 Close Mobile Navbar After Click
================================= */

function initializeNavbarCollapseOnClick() {
  const navLinks = document.querySelectorAll(".navbar .nav-link");
  const navbarCollapse = document.getElementById("navbarSupportedContent");

  if (!navLinks.length || !navbarCollapse) {
      return;
  }

  navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
          if (navbarCollapse.classList.contains("show")) {
              const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse)
                  || new bootstrap.Collapse(navbarCollapse);

              collapseInstance.hide();
          }
      });
  });
}

/* =================================
 Back to Top Button
================================= */

function initializeBackToTopButton() {
  const backToTopButton = document.getElementById("backToTop");

  if (!backToTopButton) {
      return;
  }

  function toggleBackToTopButton() {
      if (window.scrollY > 500) {
          backToTopButton.classList.add("show");
      } else {
          backToTopButton.classList.remove("show");
      }
  }

  backToTopButton.addEventListener("click", function () {
      window.scrollTo({
          top: 0,
          behavior: "smooth"
      });
  });

  window.addEventListener("scroll", toggleBackToTopButton);
  toggleBackToTopButton();
}