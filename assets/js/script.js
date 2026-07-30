$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
   $('a[href^="#"]').on('click', function (event) {
    const targetSelector = $(this).attr('href');

    if (
        targetSelector === "#" ||
        !document.querySelector(targetSelector)
    ) {
        return;
    }

    event.preventDefault();

    $('html, body').animate(
        {
            scrollTop: $(targetSelector).offset().top
        },
        500,
        'linear'
    );
});

    //<!-- emailjs to mail contact form data -->
    $("#contact-form").on("submit", function (event) {
    event.preventDefault();

    alert(
        "The contact form is temporarily unavailable. Please email me at ishapawar181@gmail.com."
    );
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Isha Pawar | Software Engineer";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/cmsoon.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: [
        "Backend Development",
        "Distributed Systems",
        "Cloud Engineering",
        "Artificial Intelligence",
        "Full-Stack Development"
    ],
    loop: true,
    typeSpeed: 40,
    backSpeed: 25,
    backDelay: 1000,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    const filePath =
        type === "skills"
            ? "./skills.json"
            : "./projects.json";

    const response = await fetch(filePath);

    if (!response.ok) {
        throw new Error(
            `Unable to load ${filePath}: ${response.status}`
        );
    }

    return response.json();
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img
                    src="${skill.icon}"
                    alt="${skill.name} logo"
                    loading="lazy"
                />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    // let projectsContainer = document.querySelector("#work .workbox-container");
    // let projectHTML = "";
    // projects.slice(0, 15).filter(project => project.category != "android").forEach(project => {
    //     projectHTML += `
    //     <div class="box tilt">
    //   <img draggable="false" src="./assets/images/yashprojects/${project.image}" alt="project" />
    //   <div class="content">
    //     <div class="tag">
    //     <h3>${project.name}</h3>
    //     </div>
    //     <div class="desc">
    //       <p>${project.desc}</p>
    //       <div class="btns">
    //         <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
    //         <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
    //       </div>
    //     </div>
    //   </div>
    // </div>`
    // });
    // projectsContainer.innerHTML = projectHTML;
    let projectsContainer = document.querySelector("#work .workbox-container");
    let projectsHTML = "";
    projects.forEach(project => {
        projectsHTML += `
        <div class="grid-item ${project.category}">
        <div class="box tilt" style="width: 350px; margin: 1rem">
        <img
            draggable="false"
            src="./assets/images/yashprojects/${project.image}"
            alt="${project.name}"
            />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>
    </div>`
    });
    projectsContainer.innerHTML = projectsHTML;

    // <!-- tilt js effect starts -->
   VanillaTilt.init(
    document.querySelectorAll("#work .tilt"),
    {
        max: 15
    }
);
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    // const srtop = ScrollReveal({
    //     origin: 'top',
    //     distance: '80px',
    //     duration: 1000,
    //     reset: true
    // });

    // /* SCROLL PROJECTS */
    // srtop.reveal('.work .box', { interval: 200 });

    // isotope filter products
    var $grid = $('.workbox-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        masonry: {
            columnWidth: 200
        }
    });

    // filter items on button click
    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}

fetchData("skills")
    .then(showSkills)
    .catch(error => {
        console.error("Skills loading failed:", error);
    });

fetchData("projects")
    .then(showProjects)
    .catch(error => {
        console.error("Projects loading failed:", error);
    });

// <!-- tilt js effect starts -->
VanillaTilt.init(
    document.querySelectorAll("#work .tilt"),
    {
        max: 15
    }
);
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end





/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .leetcode', { interval: 1000 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
// srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
// srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
// srtop.reveal('.experience .timeline', { delay: 400 });
// srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
// srtop.reveal('.contact .container', { delay: 400 });
// srtop.reveal('.contact .container .form-group', { delay: 400 });