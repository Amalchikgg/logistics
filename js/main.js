const burgerBtn = document.getElementById("burgerBtn");
const menu = document.getElementById("menu");
const closeMenuBtn = document.getElementById("closeMenuBtn");

// Открытие меню
burgerBtn.addEventListener("click", (e) => {
  menu.classList.add("active");
  burgerBtn.classList.add("active");
  document.body.classList.add("no-scroll");
  e.stopPropagation();
});

function closeMenu() {
  menu.classList.remove("active");
  burgerBtn.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

closeMenuBtn.addEventListener("click", closeMenu);

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && menu.classList.contains("active")) {
    closeMenu();
  }
});

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

    item.classList.toggle("active");
  });
});

///Form
const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");

nameInput?.addEventListener("input", function (e) {
  let value = e.target.value;
  e.target.value = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "");
});

phoneInput?.addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");

  if (value.length > 0 && value[0] !== "7") {
    value = "7" + value;
  }

  if (value.length > 11) {
    value = value.slice(0, 11);
  }

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

phoneInput?.addEventListener("focus", function (e) {
  if (e.target.value === "") {
    e.target.value = "+7 (";
  }
});

phoneInput?.addEventListener("blur", function (e) {
  if (e.target.value === "+7 (" || e.target.value === "+7") {
    e.target.value = "";
  }
});

phoneInput?.addEventListener("keydown", function (e) {
  if (e.key === "Backspace") {
    let value = e.target.value;
    if (value.length <= 4) {
      e.preventDefault();
      e.target.value = "";
    }
  }
});

// Кнопка наверх
document.getElementById("arrowUp")?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//cards
const cards = document.querySelectorAll(".truck-card");
const formCards = document.querySelectorAll(".truck-card-form");

const bigTitle = document.querySelector("#big-title");
const lenText = document.querySelector("#len");
const volText = document.querySelector("#vol");
const weightText = document.querySelector("#weight");
const priceText = document.querySelector("#price");
const bigImgDesktop = document.querySelector("#big-img-desktop");
const bigImgMobile = document.querySelector("#big-img-mobile");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");
    bigTitle.textContent = card.dataset.title;
    bigImgDesktop.src = card.dataset.img;
    bigImgMobile.src = card.dataset.img;
    lenText.textContent = card.dataset.length;
    volText.textContent = card.dataset.volume;
    weightText.textContent = card.dataset.weight;
    priceText.textContent = card.dataset.price + "₽";
  });
});

formCards.forEach((card) => {
  card.addEventListener("click", () => {
    formCards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");
  });
});

document.querySelectorAll("[data-scroll]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(el.dataset.scroll);

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

//tabs
const buttons = document.querySelectorAll(".tab-btn");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

//comments pagination

const totalPages = 149; // всего страниц
let currentPage = 1;

const currentPageEl = document.getElementById("currentPage");
const totalPagesEl = document.getElementById("totalPages");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

totalPagesEl.textContent = totalPages;

function updatePagination() {
  currentPageEl.textContent = currentPage;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updatePagination();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    updatePagination();
  }
});

updatePagination();
