(function () {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav-primary");
    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            var open = nav.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
        });

        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    var contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var addr = contactForm.getAttribute("data-email") || "";
            var subjectEl = document.getElementById("subject");
            var bodyEl = document.getElementById("body");
            if (!addr || !subjectEl || !bodyEl) return;
            var subject = encodeURIComponent(subjectEl.value.trim());
            var body = encodeURIComponent(bodyEl.value.trim());
            window.location.href =
                "mailto:" + addr + "?subject=" + subject + "&body=" + body;
        });
    }
})();
