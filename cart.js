const cities = {
  novosibirsk: { x: 549, y: 578, name: "Новосибирск" },
  krasnoyarsk: { x: 802, y: 507.5, name: "Красноярск" },
};

function drawRoute(cityStartKey, cityEndKey, regionIds) {
  const start = cities[cityStartKey];
  const end = cities[cityEndKey];
  const svgLayer = document.getElementById("routes-layer");
  const markersLayer = document.getElementById("markers-layer");

  if (!start || !end) return console.error("Города не найдены");

  // А. ЗАКРАШИВАЕМ РЕГИОНЫ
  // Снимаем активность со всех
  document
    .querySelectorAll(".map-region")
    .forEach((el) => el.classList.remove("is-active"));
  // Добавляем активность нужным (по ID, которые вы проставите в SVG)
  regionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add("is-active");
  });

  // Б. РИСУЕМ ЛИНИЮ (Кривая Безье)
  // Вычисляем контрольную точку, чтобы линия была изогнутой (провисала)
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  // Смещение кривой вниз по Y (чем больше число, тем сильнее прогиб)
  const curveOffset = 50;

  // Создаем путь: MoveTo Start -> QuadraticCurveTo ControlPoint, End
  const pathData = `M ${start.x} ${start.y} Q ${midX} ${midY + curveOffset} ${
    end.x
  } ${end.y}`;

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathData);
  path.setAttribute("class", "route-line");
  svgLayer.innerHTML = ""; // Очистить старые
  svgLayer.appendChild(path);

  // В. СТАВИМ МЕТКИ (ПИНЫ)
  markersLayer.innerHTML = ""; // Очистить старые

  const padding = 15; // Внутренний отступ контейнера
  const textHeight = 14; // Примерная высота текста
  const textOffsetX = 35; // Смещение текста от центра пина (X)
  const textOffsetY = -30; // Смещение текста по Y (на уровень иконки)

  [start, end].forEach((city) => {
    // Группа для маркера
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "city-marker");
    // Смещаем группу в координаты города
    g.setAttribute("transform", `translate(${city.x}, ${city.y})`);

    // 1. Иконка пина (нарисована кодом)
    const pinPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pinPath.setAttribute(
      "d",
      "M0 0 C-10 -15 -20 -15 -20 -30 A20 20 0 1 1 20 -30 C20 -15 10 -15 0 0 Z"
    );
    pinPath.setAttribute("class", "pin-body");

    const pinCircle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    pinCircle.setAttribute("cx", "0");
    pinCircle.setAttribute("cy", "-30");
    pinCircle.setAttribute("r", "7");
    pinCircle.setAttribute("class", "pin-center");

    // 2. ТЕКСТ (НУЖЕН ДЛЯ ИЗМЕРЕНИЯ ДЛИНЫ)
    // Создаем текст временно, чтобы узнать его длину
    const tempText = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    tempText.textContent = city.name;
    tempText.setAttribute("font-size", "14px");
    tempText.setAttribute("font-weight", "bold");
    markersLayer.appendChild(tempText); // Временно добавляем для измерения
    const textWidth = tempText.getComputedTextLength() + 2 * padding; // Длина текста + отступы
    markersLayer.removeChild(tempText); // Удаляем временный текст

    // 3. БЕЛЫЙ КОНТЕЙНЕР (RECT)
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    // Позиция X: смещение от центра пина (0), плюс небольшой отступ
    rect.setAttribute("x", textOffsetX - padding);
    // Позиция Y: на уровне Y текста, минус padding
    rect.setAttribute("y", textOffsetY - textHeight / 2 - padding / 2);
    rect.setAttribute("width", textWidth);
    rect.setAttribute("height", textHeight + padding);
    rect.setAttribute("rx", "6"); // Закругление углов
    rect.setAttribute("fill", "white");
    rect.setAttribute("stroke-width", "1");
    rect.setAttribute("filter", "url(#shadow)"); // Опционально: можно добавить тень (см. ниже)

    // 4. ТЕКСТ ОКОНЧАТЕЛЬНЫЙ
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.textContent = city.name;
    text.setAttribute("x", textOffsetX + textWidth / 2 - padding); // Выравниваем по центру контейнера
    text.setAttribute("y", textOffsetY + textHeight / 4); // Небольшая коррекция Y
    text.setAttribute("fill", "#E63946");
    text.setAttribute("font-size", "14px");
    text.setAttribute("font-weight", "bold");
    text.setAttribute("text-anchor", "middle"); // Выравнивание по центру точки

    // Сборка группы
    g.appendChild(pinPath);
    g.appendChild(pinCircle);
    g.appendChild(rect); // Сначала прямоугольник (фон)
    g.appendChild(text); // Потом текст (поверх фона)
    markersLayer.appendChild(g);
  });
}

// ЗАПУСК: Имитация работы Бэкенда
// Бэкенд должен передать на страницу ключи городов и ID регионов
// Например: "krasnoyarsk", "novosibirsk", ["region-krasnoyarsk", "region-novosibirsk"]

drawRoute("novosibirsk", "krasnoyarsk", [
  "region-krasnoyarsk",
  "region-novosibirsk",
]);
