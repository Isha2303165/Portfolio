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

    // Handle scrolling
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

    // Smooth scrolling for links that point to sections on this page
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
});

// Change the browser-tab title when the page is hidden
document.addEventListener(
    "visibilitychange",
    function () {
        const favicon =
            document.querySelector("#favicon");

        if (document.visibilityState === "visible") {
            document.title =
                "Education | Isha Pawar";

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
        ".education .heading",
        {
            delay: 150
        }
    );

    scrollReveal.reveal(
        ".education .quote",
        {
            delay: 250
        }
    );

    scrollReveal.reveal(
        ".education-card",
        {
            interval: 200
        }
    );

    scrollReveal.reveal(
        ".certifications .heading",
        {
            delay: 150
        }
    );

    scrollReveal.reveal(
        ".certification-card",
        {
            interval: 150
        }
    );
}