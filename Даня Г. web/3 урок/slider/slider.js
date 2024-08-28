let slideIndex = 0; // Инициализируем переменную slideIndex, которая отслеживает текущий активный слайд

function moveSlide(step) {
    let slides = document.getElementsByClassName("slide"); // Получаем массив всех элементов с классом "slide"
    slideIndex += step; // Изменяем slideIndex на значение step, которое может быть 1 или -1
    if (slideIndex >= slides.length) {
        slideIndex = 0; // Если slideIndex выходит за границы количества слайдов, начинаем с первого слайда
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1; // Если slideIndex меньше 0, переходим к последнему слайду
    }
    let newTransform = `translateX(${-100 * slideIndex}%)`; // Создаем строку для свойства transform, которая сдвигает слайды
    document.querySelector('.slides').style.transform = newTransform; // Применяем transform к контейнеру слайдов, чтобы показать текущий слайд
}

setInterval(() => {
    moveSlide(1);
}, 10000); // Автоматически меняет слайд каждые 10 секунд (в описании ошибочно указано 3 секунды)
