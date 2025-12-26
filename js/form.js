const radioGroups = document.querySelectorAll(".radio-group");
const cars = document.getElementById("cars");
const cargo = document.getElementById("cargo");
const carsMobile = document.getElementById("cars-mobile");
const cargoMobile = document.getElementById("cargo-mobile");

const state = {};

radioGroups.forEach((group) => {
  const groupName = group.dataset.group;
  const items = group.querySelectorAll(".radio-item");

  const activeItem = group.querySelector(".radio-item.active");
  state[groupName] = activeItem?.dataset.value;

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const value = item.dataset.value;

      if (value === "partial") {
        cars.classList.add("formHidden");
        cargo.classList.add("formHidden");
        cargoMobile.classList.add("formHidden");
        carsMobile.classList.add("formHidden");
      } else {
        cars.classList.remove("formHidden");
        cargo.classList.remove("formHidden");
        cargoMobile.classList.remove("formHidden");
        carsMobile.classList.remove("formHidden");
      }

      items.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      state[groupName] = value;

      console.log("Текущее состояние:", state);
    });
  });
});

//inputs
const DADATA_TOKEN = "e6a885ba7a1c059938d76eb355e3da6c6f6b58ad";

document.querySelectorAll(".address-form").forEach(initAddressForm);

function initAddressForm(form) {
  const inputs = form.querySelectorAll(".address-input");
  const suggestionsBox = form.querySelector(".suggestions");

  let activeInput = null;
  let controller = null;

  function hideSuggestions() {
    suggestionsBox.style.display = "none";
    suggestionsBox.innerHTML = "";
  }

  function showSuggestions(items) {
    suggestionsBox.innerHTML = "";
    suggestionsBox.style.display = "block";

    items.forEach((item) => {
      const div = document.createElement("div");
      div.className = "suggestion-item";
      div.textContent = item.value;

      div.addEventListener("click", () => {
        activeInput.value = item.value;
        hideSuggestions();

        activeInput.dataset.lat = item.data.geo_lat;
        activeInput.dataset.lon = item.data.geo_lon;

        console.log("Выбрано:", {
          role: activeInput.dataset.role,
          value: item.value,
          lat: item.data.geo_lat,
          lon: item.data.geo_lon,
        });
      });

      suggestionsBox.appendChild(div);
    });
  }

  async function fetchSuggestions(query) {
    if (!query || query.length < 3) {
      hideSuggestions();
      return;
    }

    if (controller) controller.abort();
    controller = new AbortController();

    try {
      const res = await fetch(
        "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
        {
          method: "POST",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + DADATA_TOKEN,
          },
          body: JSON.stringify({
            query,
            count: 5,
          }),
        }
      );

      const data = await res.json();
      data.suggestions.length
        ? showSuggestions(data.suggestions)
        : hideSuggestions();
    } catch (e) {
      if (e.name !== "AbortError") console.error(e);
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      activeInput = e.target;
      fetchSuggestions(e.target.value);
    });

    input.addEventListener("focus", (e) => {
      activeInput = e.target;
    });
  });

  document.addEventListener("click", (e) => {
    if (!form.contains(e.target)) {
      hideSuggestions();
    }
  });
}
