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
