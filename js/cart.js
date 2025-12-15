fetch("/assets/icons/activeMap.svg")
  .then((res) => res.text())
  .then((svg) => {
    document.getElementById("activeMap").innerHTML = svg;
    const cities = {
      novosibirsk: { x: 549, y: 578, name: "Новосибирск" },
      krasnoyarsk: { x: 802, y: 507.5, name: "Красноярск" },
      moscow: { x: 224.1, y: 391.1, name: "Москва" },
      spb: { x: 244.4, y: 255.8, name: "Санкт-Петербург" },
    };

    function getFontSize() {
      return window.innerWidth <= 1024 ? 14 : 20;
    }

    function drawRoute(cityStartKey, cityEndKey, regionIds) {
      const start = cities[cityStartKey];
      const end = cities[cityEndKey];
      const svgLayer = document.getElementById("routes-layer");
      const markersLayer = document.getElementById("markers-layer");

      if (!start || !end) return console.error("Города не найдены");

      document
        .querySelectorAll(".map-region")
        .forEach((el) => el.classList.remove("is-active"));

      regionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.classList.add("is-active");
      });

      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      const curveOffset = 50;

      const pathData = `M ${start.x} ${start.y} Q ${midX} ${
        midY + curveOffset
      } ${end.x} ${end.y}`;

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute("d", pathData);
      path.setAttribute("class", "route-line");

      svgLayer.innerHTML = "";
      svgLayer.appendChild(path);

      markersLayer.innerHTML = "";

      const FONT_SIZE = getFontSize();
      const FONT_FAMILY = "TTFirstNeue, sans-serif";
      const FONT_WEIGHT = "normal";

      const PADDING_X = 10;
      const PADDING_Y = 10;
      const GAP_FROM_PIN = 19;

      [start, end].forEach((city) => {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", "city-marker");
        g.setAttribute("transform", `translate(${city.x}, ${city.y})`);

        const pinPath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        pinPath.setAttribute(
          "d",
          `
           
            M0 0
            C-7 -11 -14 -11 -14 -24
            A14 14 0 1 1 14 -24
            C14 -11 7 -11 0 0
            Z
        
            
            M0 -28
            A5 5 0 1 0 0 -17
            A5 5 0 1 0 0 -28
            Z
          `
        );
        pinPath.setAttribute("class", "pin-body");

        pinPath.setAttribute("fill-rule", "evenodd");

        const tempText = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        tempText.textContent = city.name;
        tempText.setAttribute("font-size", FONT_SIZE);
        tempText.setAttribute("font-family", FONT_FAMILY);
        tempText.setAttribute("font-weight", FONT_WEIGHT);

        markersLayer.appendChild(tempText);
        const textWidth = tempText.getComputedTextLength();
        markersLayer.removeChild(tempText);

        const rectWidth = textWidth + PADDING_X * 2;
        const rectHeight = FONT_SIZE + PADDING_Y * 2;

        const rectX = GAP_FROM_PIN;
        const rectY = -20 - rectHeight / 2;

        const rect = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        rect.setAttribute("x", rectX);
        rect.setAttribute("y", rectY);
        rect.setAttribute("width", rectWidth);
        rect.setAttribute("height", rectHeight);
        rect.setAttribute("rx", "8");
        rect.setAttribute("fill", "#fff");

        const text = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        text.textContent = city.name;
        text.setAttribute("x", rectX + rectWidth / 2);
        text.setAttribute("y", rectY + rectHeight / 2 + FONT_SIZE / 3);
        text.setAttribute("fill", "#C83A36");
        text.setAttribute("font-size", FONT_SIZE);
        text.setAttribute("font-family", FONT_FAMILY);
        text.setAttribute("font-weight", FONT_WEIGHT);
        text.setAttribute("text-anchor", "middle");

        g.appendChild(pinPath);
        g.appendChild(rect);
        g.appendChild(text);

        markersLayer.appendChild(g);
      });
    }

    // ЗАПУСК: Имитация работы Бэкенда
    // Бэкенд должен передать на страницу ключи городов и ID регионов
    // Например: "krasnoyarsk", "novosibirsk", ["region-krasnoyarsk", "region-novosibirsk"]

    drawRoute("moscow", "krasnoyarsk", ["region-moscow", "region-krasnoyarsk"]);
  });
