console.log(`=== ІНСТРУКЦІЯ З ВИКОРИСТАННЯ ФУНКЦІЇ triangle() ===
Функція розв'язує прямокутний трикутник за 2 елементами.
Синтаксис: triangle(val1, type1, val2, type2)

Допустимі типи (types):
  - "leg" (катет)
  - "hypotenuse" (гіпотенуза)
  - "adjacent angle" (прилеглий до катета кут)
  - "opposite angle" (протилежний до катета кут)
  - "angle" (гострий кут, коли задана гіпотенуза)

Приклади виклика:
  triangle(7, "leg", 18, "hypotenuse");
  triangle(60, "opposite angle", 5, "leg");
======================================================`);

function triangle(val1, type1, val2, type2) {
  // Перевірка на від'ємні або нульові значення
  if (typeof val1 !== "number" || typeof val2 !== "number" || val1 <= 0 || val2 <= 0) {
    console.log("Zero or negative input");
    return "Zero or negative input";
  }

  const RAD_TO_DEG = 180 / Math.PI;
  const DEG_TO_RAD = Math.PI / 180;

  let a, b, c, alpha, beta;

  // Нормалізація типів та значень для зручності
  const pairs = [
    { v: val1, t: type1 },
    { v: val2, t: type2 }
  ];

  const types = pairs.map(p => p.t);

  const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
  if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
    console.log("Некоректний тип елемента. Перечитайте інструкцію.");
    return "failed";
  }

  // 1. Два катети: "leg" + "leg"
  if (types.filter(t => t === "leg").length === 2) {
    a = pairs[0].v;
    b = pairs[1].v;
    c = Math.sqrt(a * a + b * b);
    alpha = Math.atan(a / b) * RAD_TO_DEG;
    beta = 90 - alpha;
  }
  // 2. Катет і гіпотенуза: "leg" + "hypotenuse"
  else if (types.includes("leg") && types.includes("hypotenuse")) {
    const legObj = pairs.find(p => p.t === "leg");
    const hypObj = pairs.find(p => p.t === "hypotenuse");

    a = legObj.v;
    c = hypObj.v;

    if (a >= c) {
      console.log("Катет не може бути більшим або рівним гіпотенузі!");
      return "Incorrect input values";
    }

    b = Math.sqrt(c * c - a * a);
    alpha = Math.asin(a / c) * RAD_TO_DEG;
    beta = 90 - alpha;
  }
  // 3. Катет і прилеглий кут: "leg" + "adjacent angle"
  else if (types.includes("leg") && types.includes("adjacent angle")) {
    const legObj = pairs.find(p => p.t === "leg");
    const angleObj = pairs.find(p => p.t === "adjacent angle");

    b = legObj.v;
    beta = angleObj.v;

    if (beta >= 90) {
      console.log("Кут має бути гострим (< 90 градусів)");
      return "Incorrect input values";
    }

    alpha = 90 - beta;
    a = b * Math.tan(alpha * DEG_TO_RAD);
    c = b / Math.cos(alpha * DEG_TO_RAD);
  }
  // 4. Катет і протилежний кут: "leg" + "opposite angle"
  else if (types.includes("leg") && types.includes("opposite angle")) {
    const legObj = pairs.find(p => p.t === "leg");
    const angleObj = pairs.find(p => p.t === "opposite angle");

    a = legObj.v;
    alpha = angleObj.v;

    if (alpha >= 90) {
      console.log("Кут має бути гострим (< 90 градусів)");
      return "Incorrect input values";
    }

    beta = 90 - alpha;
    b = a / Math.tan(alpha * DEG_TO_RAD);
    c = a / Math.sin(alpha * DEG_TO_RAD);
  }
  // 5. Гіпотенуза і кут: "hypotenuse" + "angle"
  else if (types.includes("hypotenuse") && types.includes("angle")) {
    const hypObj = pairs.find(p => p.t === "hypotenuse");
    const angleObj = pairs.find(p => p.t === "angle");

    c = hypObj.v;
    alpha = angleObj.v;

    if (alpha >= 90) {
      console.log("Кут має бути гострим (< 90 градусів)");
      return "Incorrect input values";
    }

    beta = 90 - alpha;
    a = c * Math.sin(alpha * DEG_TO_RAD);
    b = c * Math.cos(alpha * DEG_TO_RAD);
  } 
  else {
    console.log("Несумісна пара типів. Ознайомтеся з інструкцією.");
    return "failed";
  }

  // Вивід результатів у консоль
  console.log(`a = ${a}`);
  console.log(`b = ${b}`);
  console.log(`c = ${c}`);
  console.log(`alpha = ${alpha}`);
  console.log(`beta = ${beta}`);

  return "success";
}