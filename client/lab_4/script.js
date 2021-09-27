let slidePosition = 0;
let slides = document.querySelectorAll(".carousel_item");
let totalSlides = slides.length;

document.querySelector("#next-button").addEventListener("click", function() {
    moveToNextSlide();
});

document.querySelector("#prev-button").addEventListener("click", function() {
    moveToPrevSlide();
});

function updateSlidePosition() {
    for (let slide of slides) {
        slide.classList.remove("visible");
    }

    slides[slidePosition].classList.add("visible");
}

function moveToNextSlide() {
    if (slidePosition == totalSlides - 1) {
        slidePosition = 0;
    } else {
        slidePosition++;
    }

    updateSlidePosition();
}

function moveToPrevSlide() {
    if (slidePosition == 0) {
        slidePosition = totalSlides - 1;
    } else {
        slidePosition--;
    }

    updateSlidePosition();
}

