$(document).ready(function () {
    // Open and close the mobile navigation menu
    $("#menu").click(function () {
        $(this).toggleClass("fa-times");
        $(".navbar").toggleClass("nav-toggle");
    });

    // Close the mobile menu when a navigation link is clicked
    $(".navbar a").click(function () {
        $("#menu").removeClass("fa-times");
        $(".navbar").removeClass("nav-toggle");
    });

    // Handle page scrolling
    $(window).on("scroll load", function () {
        $("#menu").removeClass("fa-times");
        $(".navbar").removeClass("nav-toggle");

        const scrollTopButton =
            document.querySelector("#scroll-top");

        if (!scrollTopButton) {
            return;
        }

        if (window.scrollY > 60) {
            scrollTopButton.classList.add("active");
        } else {
            scrollTopButton.classList.remove("active");
        }
    });

    // Smooth scrolling for links on the Contact page
    $('a[href^="#"]').on("click", function (event) {
        const targetSelector = $(this).attr("href");

        if (
            targetSelector === "#" ||
            !document.querySelector(targetSelector)
        ) {
            return;
        }

        event.preventDefault();

        $("html, body").animate(
            {
                scrollTop:
                    $(targetSelector).offset().top - 70
            },
            500,
            "linear"
        );
    });

    // Contact form
    $("#contact-form").on("submit", function (event) {
        event.preventDefault();

        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const subject = $("#subject").val().trim();
        const message = $("#message").val().trim();

        if (!name || !email || !subject || !message) {
            alert("Please complete all fields before submitting.");
            return;
        }

        const emailSubject =
            encodeURIComponent(subject);

        const emailBody = encodeURIComponent(
            `Hello Isha,

${message}

Name: ${name}
Email: ${email}`
        );

        const mailtoLink =
            `mailto:ishapawar181@gmail.com?subject=${emailSubject}&body=${emailBody}`;

        window.location.href = mailtoLink;
    });
});

// Change the browser-tab title when the page is hidden
document.addEventListener(
    "visibilitychange",
    function () {
        const favicon =
            document.querySelector("#favicon");

        if (document.visibilityState === "visible") {
            document.title =
                "Contact | Isha Pawar";

            if (favicon) {
                favicon.href =
                    "../assets/images/flower.png";
            }
        } else {
            document.title =
                "Come Back To Portfolio";

            if (favicon) {
                favicon.href =
                    "../assets/images/flower.png";
            }
        }
    }
);

// Scroll Reveal animations
if (typeof ScrollReveal !== "undefined") {
    const scrollReveal = ScrollReveal({
        origin: "top",
        distance: "70px",
        duration: 1000,
        reset: false
    });

    scrollReveal.reveal(
        ".section-heading",
        {
            delay: 150
        }
    );

    scrollReveal.reveal(
        ".contact-info",
        {
            origin: "left",
            delay: 250
        }
    );

    scrollReveal.reveal(
        ".contact-form-container",
        {
            origin: "right",
            delay: 250
        }
    );

    scrollReveal.reveal(
        ".contact-item",
        {
            interval: 150
        }
    );
}