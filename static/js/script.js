/* =========================================
   JUA PHILOSOPHY — GSAP EXPERIENCE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);


    const philosophy = document.querySelector(".jua-philosophy");

    if (!philosophy) {
        return;
    }


    const juaJ = document.querySelector(".jua-j");
    const juaU = document.querySelector(".jua-u");
    const juaA = document.querySelector(".jua-a");

    const philosophyReveal =
        document.querySelector(".philosophy-reveal");

    const background =
        document.querySelector(".philosophy-background");

    const scrollIndicator =
        document.querySelector(".philosophy-scroll");


    /* -----------------------------------------
       MASTER TIMELINE
    ----------------------------------------- */

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: philosophy,

            start: "top top",
            end: "bottom bottom",

            scrub: 1.2,

            pin: ".philosophy-pin",

            anticipatePin: 1
        }
    });


    /* -----------------------------------------
       1. JUA STARTS LARGE
    ----------------------------------------- */

    tl.fromTo(
        ".jua-word",
        {
            scale: 1
        },
        {
            scale: 0.55,

            duration: 1,

            ease: "power2.inOut"
        }
    );


    /* -----------------------------------------
       2. LETTERS SEPARATE
    ----------------------------------------- */

    tl.to(
        juaJ,
        {
            xPercent: -180,

            rotation: -8,

            duration: 1,

            ease: "power3.inOut"
        },
        "<"
    );


    tl.to(
        juaU,
        {
            yPercent: 110,

            duration: 1,

            ease: "power3.inOut"
        },
        "<"
    );


    tl.to(
        juaA,
        {
            xPercent: 180,

            rotation: 8,

            duration: 1,

            ease: "power3.inOut"
        },
        "<"
    );


    /* -----------------------------------------
       3. BACKGROUND EXPANDS
    ----------------------------------------- */

    tl.to(
        background,
        {
            scale: 1,

            duration: 1,

            ease: "power2.out"
        },
        "<"
    );


    /* -----------------------------------------
       4. PHILOSOPHY APPEARS
    ----------------------------------------- */

    tl.to(
        philosophyReveal,
        {
            opacity: 1,

            y: 0,

            duration: 1,

            ease: "power3.out"
        },
        "-=0.35"
    );


    /* -----------------------------------------
       5. SCROLL INDICATOR FADES
    ----------------------------------------- */

    tl.to(
        scrollIndicator,
        {
            opacity: 0,

            duration: 0.4
        },
        "<"
    );

});



/* =========================================================
   JUA — FULL EXPERIENCE ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined") {
        console.warn("GSAP is not loaded.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);


    /* =====================================================
       THREE WORLDS
    ===================================================== */

    const worlds = document.querySelector(".jua-worlds");

    if (worlds) {

        const cards = gsap.utils.toArray(".world-card");
        const progress = document.querySelector(
            ".worlds-progress-line span"
        );

        const worldTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: worlds,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.2,
                pin: ".worlds-stage",
                anticipatePin: 1
            }
        });


        cards.forEach((card, index) => {

            if (index === 0) {
                return;
            }

            worldTimeline.to(
                cards[index - 1],
                {
                    x: -window.innerWidth * 0.9,
                    rotation: -8,
                    scale: 0.8,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.inOut"
                }
            );

            worldTimeline.fromTo(
                card,
                {
                    x: window.innerWidth * 0.9,
                    rotation: 8,
                    scale: 0.8,
                    opacity: 0
                },
                {
                    x: 0,
                    rotation: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out"
                },
                "<"
            );

        });


        ScrollTrigger.create({
            trigger: worlds,
            start: "top top",
            end: "bottom bottom",

            onUpdate: self => {

                if (progress) {
                    progress.style.height =
                        `${self.progress * 100}%`;
                }

            }

        });

    }



    /* =====================================================
       CASE STUDIES — HORIZONTAL SCROLL
    ===================================================== */

    const cases = document.querySelector(".jua-cases");
    const casesTrack = document.querySelector(".cases-track");

    if (cases && casesTrack) {

        const getScrollAmount = () => {

            return -(casesTrack.scrollWidth - window.innerWidth);

        };


        gsap.to(casesTrack, {

            x: getScrollAmount,

            ease: "none",

            scrollTrigger: {

                trigger: cases,

                start: "top top",

                end: "bottom bottom",

                scrub: 1,

                pin: ".cases-window",

                invalidateOnRefresh: true

            }

        });


        gsap.utils.toArray(".case-image").forEach(image => {

            gsap.fromTo(
                image,

                {
                    scale: 1.15
                },

                {
                    scale: 1,

                    ease: "none",

                    scrollTrigger: {
                        trigger: image.closest(".case-card"),

                        start: "left right",

                        end: "right left",

                        scrub: true,

                        containerAnimation:
                            gsap.getById("casesHorizontal")
                    }

                }
            );

        });

    }



    /* =====================================================
       UKWELI ARTS
    ===================================================== */

    const arts = document.querySelector(".ukweli-arts");

    if (arts) {

        gsap.fromTo(
            ".arts-image",
            {
                scale: 1.25,
                y: 80
            },
            {
                scale: 1,
                y: 0,

                ease: "none",

                scrollTrigger: {
                    trigger: arts,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            }
        );


        gsap.from(
            ".arts-big-word",
            {
                x: -120,
                opacity: 0,

                duration: 1.2,

                ease: "power4.out",

                scrollTrigger: {
                    trigger: arts,
                    start: "top 65%"
                }
            }
        );


        gsap.from(
            ".arts-story p",
            {
                y: 40,
                opacity: 0,

                stagger: .15,

                duration: .8,

                ease: "power3.out",

                scrollTrigger: {
                    trigger: ".arts-story",
                    start: "top 75%"
                }
            }
        );

    }



    /* =====================================================
       LAND / PARALLAX
    ===================================================== */

    const land = document.querySelector(".jua-land");

    if (land) {

        gsap.to(
            ".land-sun",
            {
                y: -180,
                scale: 1.35,

                ease: "none",

                scrollTrigger: {
                    trigger: land,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            }
        );


        gsap.to(
            ".land-horizon",
            {
                y: -120,

                ease: "none",

                scrollTrigger: {
                    trigger: land,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            }
        );


        gsap.from(
            ".land-content > *",
            {
                y: 40,
                opacity: 0,

                stagger: .12,

                duration: 1,

                ease: "power3.out",

                scrollTrigger: {
                    trigger: land,
                    start: "top 60%"
                }
            }
        );

    }



    /* =====================================================
       VISION — BIG TYPOGRAPHY
    ===================================================== */

    const vision = document.querySelector(".jua-vision");

    if (vision) {

        gsap.to(
            ".vision-line span",
            {
                y: 0,

                stagger: .15,

                duration: 1.1,

                ease: "power4.out",

                scrollTrigger: {
                    trigger: vision,
                    start: "top 65%"
                }
            }
        );

    }



    /* =====================================================
       DEVELOPMENT PHASES
    ===================================================== */

    const phaseItems =
        gsap.utils.toArray(".phase-item");

    if (phaseItems.length) {

        phaseItems.forEach(item => {

            gsap.from(
                item,
                {
                    y: 70,
                    opacity: 0,

                    duration: .9,

                    ease: "power3.out",

                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%"
                    }
                }
            );

        });

    }



    /* =====================================================
       2016 TIMELINE
    ===================================================== */

    const timeline =
        document.querySelector(".jua-timeline");

    const timelineTrack =
        document.querySelector(".timeline-track");

    if (timeline && timelineTrack) {

        gsap.to(
            timelineTrack,
            {
                x: () =>
                    -(timelineTrack.scrollWidth -
                    window.innerWidth * .45),

                ease: "none",

                scrollTrigger: {
                    trigger: timeline,

                    start: "top top",

                    end: "bottom bottom",

                    scrub: 1,

                    pin: ".timeline-sticky",

                    invalidateOnRefresh: true
                }
            }
        );


        gsap.utils.toArray(".timeline-event")
            .forEach(event => {

                gsap.from(
                    event,
                    {
                        y: 80,
                        opacity: 0,

                        duration: .8,

                        ease: "power3.out",

                        scrollTrigger: {
                            trigger: event,
                            start: "top 85%"
                        }
                    }
                );

            });

    }



    /* =====================================================
       LEARNING TRACKS
    ===================================================== */

    const learningButtons =
        document.querySelectorAll(".learning-track");

    const learningPanels =
        document.querySelectorAll(".learning-panel");


    learningButtons.forEach(button => {

        button.addEventListener("click", () => {

            const target =
                button.dataset.track;


            learningButtons.forEach(item => {
                item.classList.remove("active");
            });


            learningPanels.forEach(panel => {
                panel.classList.remove("active");
            });


            button.classList.add("active");


            const panel =
                document.querySelector(
                    `[data-panel="${target}"]`
                );


            if (panel) {

                panel.classList.add("active");


                gsap.fromTo(
                    panel,
                    {
                        opacity: 0,
                        y: 20
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: .5,
                        ease: "power3.out"
                    }
                );

            }

        });

    });



    /* =====================================================
       SCHOLARS
    ===================================================== */

    const scholars =
        document.querySelector(".jua-scholars");

    if (scholars) {

        gsap.from(
            ".scholars-number",
            {
                scale: .7,
                opacity: 0,

                duration: 1.4,

                ease: "power4.out",

                scrollTrigger: {
                    trigger: scholars,
                    start: "top 65%"
                }
            }
        );


        gsap.from(
            ".scholar-tags span",
            {
                y: 30,
                opacity: 0,

                stagger: .1,

                duration: .6,

                ease: "power3.out",

                scrollTrigger: {
                    trigger: scholars,
                    start: "top 60%"
                }
            }
        );

    }



    /* =====================================================
       FINAL CTA
    ===================================================== */

    const finalSection =
        document.querySelector(".jua-final");

    if (finalSection) {

        gsap.from(
            ".final-content h2",
            {
                y: 120,
                opacity: 0,

                duration: 1.3,

                ease: "power4.out",

                scrollTrigger: {
                    trigger: finalSection,
                    start: "top 65%"
                }
            }
        );


        gsap.from(
            ".final-button",
            {
                y: 30,
                opacity: 0,

                duration: .8,

                delay: .3,

                ease: "power3.out",

                scrollTrigger: {
                    trigger: finalSection,
                    start: "top 60%"
                }
            }
        );

    }



    /* =====================================================
       REFRESH
    ===================================================== */

    window.addEventListener("load", () => {

        ScrollTrigger.refresh();

    });

});