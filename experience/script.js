$(document).ready(function () {
    // Mobile navigation menu
    $("#menu").click(function () {
        $(this).toggleClass("fa-times");
        $(".navbar").toggleClass("nav-toggle");
    });

    // Close mobile menu and control scroll-to-top button
    $(window).on("scroll load", function () {
        $("#menu").removeClass("fa-times");
        $(".navbar").removeClass("nav-toggle");

        const scrollTopButton =
            document.querySelector("#scroll-top");

       if (scrollTopButton) {
    if (window.scrollY > 60) {
        scrollTopButton.classList.add("active");
    } else {
        scrollTopButton.classList.remove("active");
    }
}
    });

    // Smooth scrolling for links within this page
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
                scrollTop: $(targetSelector).offset().top
            },
            500,
            "linear"
        );
    });
});

// Change title and favicon when browser tab visibility changes
document.addEventListener(
    "visibilitychange",
    function () {
        if (document.visibilityState === "visible") {
            document.title =
                "Experience | Isha Pawar";

            $("#favicon").attr(
                "href",
                "../assets/images/favicon.png"
            );
        } else {
            document.title =
                "Come Back To Portfolio";

            $("#favicon").attr(
                "href",
                "../assets/images/favicon.png"
            );
        }
    }
);

// ScrollReveal animation
const scrollReveal = ScrollReveal({
    origin: "bottom",
    distance: "80px",
    duration: 1000,
    reset: false
});

scrollReveal.reveal(
    ".experience .heading",
    {
        delay: 100
    }
);

scrollReveal.reveal(
    ".experience .quote",
    {
        delay: 200
    }
);

scrollReveal.reveal(
    ".experience .timeline .container",
    {
        interval: 200
    }
);

scrollReveal.reveal(
    ".experience .morebtn",
    {
        delay: 200
    }
);

scrollReveal.reveal(
    ".footer .box",
    {
        interval: 150
    }
);