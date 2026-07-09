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
    const roleContentBlocks = document.querySelectorAll("[data-role-content]");
    const projectCards = document.querySelectorAll("[data-project-views]");
    const activeViewName = document.getElementById("active-view-name");

    if (!viewButtons.length) {
        return;
    }

    const viewContent = {
        software: {
            bodyClass: "software-mode",
            activeViewText: "Software Engineering View",
            heroKicker: "MS Computer Science Graduate · Software Engineering View",
            heroRole: "Software Engineer | Backend/API Validation | ML/Search Projects",
            heroDesc: "I build practical software across Java, Python, SQL, Angular, PHP/MySQL, search systems, and data-driven workflows with a focus on maintainability and reliability.",
            snapshotLabel: "Software Engineering Snapshot",
            snapshotFocus: "Build + Validate",
            snapshotStyle: "Apps · Data · Search",
            snapshotStrengths: "Java · Python · SQL",
            snapshotRoles: "SWE · Backend · QA",
            snapshotTags: ["Backend", "Java Apps", "Search", "ML Evaluation"],
            aboutSubtitle: "Software engineering graduate focused on building maintainable applications, validating workflows, and improving reliability.",
            skillsSubtitle: "Software development, backend/data workflows, and ML/search evaluation skills emphasized for engineering roles.",
            experienceSubtitle: "Experience details emphasized around web platforms, Java desktop applications, backend workflows, and practical debugging."
        },
        qa: {
            bodyClass: "qa-mode",
            activeViewText: "QA / Software Testing View",
            heroKicker: "MS Computer Science Graduate · QA / Testing View",
            heroRole: "QA Engineer | Software Test Engineer | Test Automation / SDET Focus",
            heroDesc: "I validate software through functional testing, regression checks, backend/API validation, SQL-based verification, defect analysis, and release-readiness documentation.",
            snapshotLabel: "QA / Testing Snapshot",
            snapshotFocus: "Test + Verify",
            snapshotStyle: "Workflows · Defects · RCA",
            snapshotStrengths: "SQL · Testing · Debugging",
            snapshotRoles: "QA · SDET · Test Engineer",
            snapshotTags: ["Regression", "API/UI", "SQL Checks", "RCA"],
            aboutSubtitle: "QA-focused portfolio view centered on validation, defect analysis, backend checks, and software reliability.",
            skillsSubtitle: "Testing, validation, automation tools, defect analysis, and release-readiness skills emphasized for QA/SDET roles.",
            experienceSubtitle: "Experience details emphasized around QA validation, regression testing, root-cause analysis, and production support."
        }
    };

    function setText(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    function setSnapshotTags(tags) {
        const tagContainer = document.getElementById("snapshotTags");
        if (!tagContainer) {
            return;
        }

        tagContainer.innerHTML = "";

        tags.forEach(function (tagText) {
            const tag = document.createElement("span");
            tag.textContent = tagText;
            tagContainer.appendChild(tag);
        });
    }

    function applyPortfolioView(viewName) {
        const content = viewContent[viewName] || viewContent.software;

        document.body.classList.remove("software-mode", "qa-mode");
        document.body.classList.add(content.bodyClass);

        viewButtons.forEach(function (button) {
            const buttonView = button.getAttribute("data-view-btn");
            button.classList.toggle("active", buttonView === viewName);
        });

        viewPanels.forEach(function (panel) {
            const panelView = panel.getAttribute("data-view-panel");
            panel.classList.toggle("d-none", panelView !== viewName);
        });

        roleContentBlocks.forEach(function (block) {
            const blockView = block.getAttribute("data-role-content");
            block.classList.toggle("d-none", blockView !== viewName);
        });

        projectCards.forEach(function (card) {
            const supportedViews = card.getAttribute("data-project-views").split(" ");
            const shouldShow = supportedViews.includes(viewName);
            card.classList.toggle("is-hidden", !shouldShow);
        });

        setText("active-view-name", content.activeViewText);
        setText("heroKicker", content.heroKicker);
        setText("heroRole", content.heroRole);
        setText("heroDesc", content.heroDesc);
        setText("snapshotLabel", content.snapshotLabel);
        setText("snapshotFocus", content.snapshotFocus);
        setText("snapshotStyle", content.snapshotStyle);
        setText("snapshotStrengths", content.snapshotStrengths);
        setText("snapshotRoles", content.snapshotRoles);
        setText("aboutSubtitle", content.aboutSubtitle);
        setText("skillsSubtitle", content.skillsSubtitle);
        setText("experienceSubtitle", content.experienceSubtitle);
        setSnapshotTags(content.snapshotTags);
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

    if (!navLinks.length || !navbarCollapse || typeof bootstrap === "undefined") {
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
