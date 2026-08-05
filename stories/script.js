function resizeStoryCard(card) {
    const gallery = document.querySelector(".story-gallery");

    if (!gallery || !card) {
        return;
    }

    const styles = window.getComputedStyle(gallery);
    const rowHeight = Number.parseInt(styles.gridAutoRows, 10);
    const rowGap = Number.parseInt(styles.rowGap, 10);

    const cardHeight = card.getBoundingClientRect().height;
    const rowSpan = Math.ceil(
        (cardHeight + rowGap) / (rowHeight + rowGap)
    );

    card.style.gridRowEnd = `span ${rowSpan}`;
}

function resizeAllStoryCards() {
    document
        .querySelectorAll(".story-card")
        .forEach(resizeStoryCard);
}

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(
        ".story-card img"
    );

    images.forEach((image) => {
        if (image.complete) {
            resizeStoryCard(
                image.closest(".story-card")
            );
        } else {
            image.addEventListener("load", () => {
                resizeStoryCard(
                    image.closest(".story-card")
                );
            });
        }
    });

    resizeAllStoryCards();
});

window.addEventListener("resize", () => {
    window.requestAnimationFrame(
        resizeAllStoryCards
    );
});