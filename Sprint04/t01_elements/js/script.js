const characters = document.getElementById("characters").children;

for (let i = 0; i < characters.length; i++) {
  const classAttribute = characters[i].getAttribute("class");
  let value = characters[i].getAttribute("data-element");

  if ((classAttribute != "good" && classAttribute != "evil") || !classAttribute) {
    characters[i].className = "unknown";
  }
  if (!value) {
    characters[i].setAttribute("data-element", "none");
  }
  characters[i].appendChild(document.createElement("br"));
  if (characters[i].getAttribute("data-element") == "none") {
    let icon = document.createElement("div");
    let line = document.createElement("div");
    icon.setAttribute("class", `elem ${value}`);
    characters[i].appendChild(icon);
    line.setAttribute("class", "line");
    icon.appendChild(line);
  } else {
    value = characters[i].getAttribute("data-element").split(" ");
    for (let j = 0; j < value.length; j++) {
      let icon = document.createElement("div");
      icon.setAttribute("class", `elem ${value[j]}`);
      characters[i].appendChild(icon);
    }
  }
}
