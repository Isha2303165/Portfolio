$(document).ready(function () {
    // Mobile navigation
    $("#menu").click(function () {
        $(this).toggleClass("fa-times");
        $(".navbar").toggleClass("nav-toggle");
    });

    // Close mobile navigation while scrolling
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

    // Smooth scrolling for links on this page
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

// Browser-tab title
document.addEventListener(
    "visibilitychange",
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Project Work | Isha Pawar";

            $("#favicon").attr(
                "href",
                "../assets/images/flower.png"
            );
        } else {
            document.title = "Come Back To Portfolio";

            $("#favicon").attr(
                "href",
                "../assets/images/flower.png"
            );
        }
    }
);

// Load projects from the root projects.json file
async function getProjects() {
    const response = await fetch("../projects.json");

    if (!response.ok) {
        throw new Error(
            `Unable to load projects.json: ${response.status}`
        );
    }

    return response.json();
}

// Display project cards
function showProjects(projects) {
    const projectsContainer =
        document.querySelector(".work .box-container");

    let projectsHTML = "";

    projects.forEach((project) => {
        /*
         * External links already contain http/https.
         * Internal links such as projects/video-transcriber.html
         * need ../ because this script is already inside /projects.
         */
        const viewLink = project.links.view
            ? project.links.view.startsWith("http")
                ? project.links.view
                : `../${project.links.view}`
            : "";

        /*
         * If view is empty, do not display the View button.
         * No target="_blank" means View opens in the same tab.
         */
        const viewButton = viewLink
            ? `
                <a
                    href="${viewLink}"
                    class="btn"
                >
                    <i class="fas fa-eye"></i>
                    View
                </a>
            `
            : "";

        projectsHTML += `
            <div class="grid-item ${project.category}">
                <div class="box tilt">
                    <img
                        draggable="false"
                        src="../assets/images/yashprojects/${project.image}"
                        alt="${project.name}"
                        loading="lazy"
                    />

                    <div class="content">
                        <div class="tag">
                            <h3>${project.name}</h3>
                        </div>

                        <div class="desc">
                            <p>${project.desc}</p>

                            <div class="btns">
                                ${viewButton}

                                <a
                                    href="${project.links.code}"
                                    class="btn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Code
                                    <i class="fas fa-code"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    projectsContainer.innerHTML = projectsHTML;

    // Project-card tilt effect
    VanillaTilt.init(
        document.querySelectorAll(".work .tilt"),
        {
            max: 15
        }
    );

    // Project-card scroll animation
    const scrollReveal = ScrollReveal({
        origin: "bottom",
        distance: "80px",
        duration: 1000,
        reset: false
    });

    scrollReveal.reveal(".work .box", {
        interval: 200
    });

    // Initialize project filtering
    const $grid = $(".box-container").isotope({
        itemSelector: ".grid-item",
        layoutMode: "fitRows"
    });

    // Filter projects when a button is clicked
    $(".button-group").on(
        "click",
        "button",
        function () {
            $(".button-group")
                .find(".is-checked")
                .removeClass("is-checked");

            $(this).addClass("is-checked");

            const filterValue =
                $(this).attr("data-filter");

            $grid.isotope({
                filter: filterValue
            });
        }
    );
}

// Load and display projects
getProjects()
    .then(showProjects)
    .catch((error) => {
        console.error(
            "Projects loading failed:",
            error
        );

        const projectsContainer =
            document.querySelector(
                ".work .box-container"
            );

        if (projectsContainer) {
            projectsContainer.innerHTML = `
                <p class="project-error">
                    Projects could not be loaded.
                    Please try again later.
                </p>
            `;
        }
    });