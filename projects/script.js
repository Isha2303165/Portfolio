$(document).ready(function () {
    // Mobile navigation
    $("#menu").click(function () {
        $(this).toggleClass("fa-times");
        $(".navbar").toggleClass("nav-toggle");
    });

    // Close mobile menu and manage scroll-to-top button
    $(window).on("scroll load", function () {
        $("#menu").removeClass("fa-times");
        $(".navbar").removeClass("nav-toggle");

        const scrollTopButton = document.querySelector("#scroll-top");

        if (window.scrollY > 60) {
            scrollTopButton.classList.add("active");
        } else {
            scrollTopButton.classList.remove("active");
        }
    });
});

// Change browser-tab title
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
        document.title = "Projects | Isha Pawar";
        $("#favicon").attr(
            "href",
            "../assets/images/favicon.png"
        );
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr(
            "href",
            "../assets/images/favicon.png"
        );
    }
});

// Fetch projects from the root projects.json file
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
                                <a
                                    href="${project.links.view}"
                                    class="btn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i class="fas fa-eye"></i>
                                    View
                                </a>

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

    // Tilt animation
    VanillaTilt.init(
        document.querySelectorAll(".work .tilt"),
        {
            max: 15
        }
    );

    // Scroll animation
    const scrollReveal = ScrollReveal({
        origin: "bottom",
        distance: "80px",
        duration: 1000,
        reset: true
    });

    scrollReveal.reveal(".work .box", {
        interval: 200
    });

    // Project filtering
    const $grid = $(".box-container").isotope({
        itemSelector: ".grid-item",
        layoutMode: "fitRows"
    });

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

// Load projects
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

        projectsContainer.innerHTML = `
            <p class="project-error">
                Projects could not be loaded.
                Please try again later.
            </p>
        `;
    });