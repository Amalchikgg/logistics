const burgerBtn = document.getElementById("burgerBtn");
const menu = document.getElementById("menu");
const closeMenuBtn = document.getElementById("closeMenuBtn");

// Открытие меню
burgerBtn.addEventListener("click", (e) => {
  menu.classList.add("active");
  burgerBtn.classList.add("active");
  document.body.classList.add("no-scroll"); // блокируем скролл страницы
  e.stopPropagation();
});

// Закрытие меню
function closeMenu() {
  menu.classList.remove("active");
  burgerBtn.classList.remove("active");
  document.body.classList.remove("no-scroll"); // возвращаем скролл
}

closeMenuBtn.addEventListener("click", closeMenu);

// Клик вне меню — закрываем
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && menu.classList.contains("active")) {
    closeMenu();
  }
});

// Клик по самому меню — не закрываем
menu.addEventListener("click", (e) => e.stopPropagation());

//Slider

const swiper = new Swiper(".mySwiper", {
  loop: true, // бесконечный слайдер
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  autoHeight: true, // подстраивает высоту под активный слайд
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
