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

const swiperElement = document.querySelector(".mySwiper");

if (swiperElement) {
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    autoHeight: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

const headers = document.querySelectorAll(".accordion-header");

headers.forEach((header) => {
  header.addEventListener("click", function () {
    console.log("click");

    const item = this.parentElement;

    // Просто переключаем текущий элемент
    item.classList.toggle("active");
  });
});

///Form
const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");

// Валидация имени - только буквы и пробелы
nameInput.addEventListener("input", function (e) {
  let value = e.target.value;
  // Оставляем только буквы (латиница и кириллица) и пробелы
  e.target.value = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "");
});

// Маска для российского номера телефона
phoneInput.addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");

  // Если первая цифра не 7, добавляем 7
  if (value.length > 0 && value[0] !== "7") {
    value = "7" + value;
  }

  // Ограничиваем длину (7 + 10 цифр)
  if (value.length > 11) {
    value = value.slice(0, 11);
  }

  // Форматируем номер
  let formatted = "+7";

  if (value.length > 1) {
    formatted += " (" + value.substring(1, 4);
  }
  if (value.length >= 5) {
    formatted += ") " + value.substring(4, 7);
  }
  if (value.length >= 8) {
    formatted += "-" + value.substring(7, 9);
  }
  if (value.length >= 10) {
    formatted += "-" + value.substring(9, 11);
  }

  e.target.value = formatted;
});

// Устанавливаем начальное значение для телефона
phoneInput.addEventListener("focus", function (e) {
  if (e.target.value === "") {
    e.target.value = "+7 (";
  }
});

phoneInput.addEventListener("blur", function (e) {
  if (e.target.value === "+7 (" || e.target.value === "+7") {
    e.target.value = "";
  }
});

// Обработка нажатия Backspace
phoneInput.addEventListener("keydown", function (e) {
  if (e.key === "Backspace") {
    let value = e.target.value;
    if (value.length <= 4) {
      e.preventDefault();
      e.target.value = "";
    }
  }
});
