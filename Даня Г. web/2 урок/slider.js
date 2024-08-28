let slideIndex = 0;

function moveSlide(step) {
    let slides = document.getElementsByClassName('slide'); // Исправлено с 'slide' на 'class'
    slideIndex += step;

    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    let newTransform = `translateX(${-100 * slideIndex}%)`; // Исправлено syntax ошибки с кавычками
    document.querySelector('.slides').style.transform = newTransform; // Исправлено на '.slides'
}

// Автоматическая смена слайдов каждые 10 секунд
setInterval(() => {
    moveSlide(1);
}, 10000);