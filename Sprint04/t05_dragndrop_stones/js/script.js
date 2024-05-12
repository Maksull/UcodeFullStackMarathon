document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main");
  let draggingElement = null;

  main.addEventListener("mousedown", startDragging);
  main.addEventListener("mouseup", stopDragging);
  main.addEventListener("mousemove", dragElement);
  main.addEventListener("dblclick", toggleStoneState);

  function startDragging(event) {
    const target = event.target;
    if (
      target &&
      target.classList.contains("stones") &&
      target.getAttribute("value") === "on"
    ) {
      draggingElement = target;
      draggingElement.style.cursor = "none";
      const rect = draggingElement.getBoundingClientRect();
      draggingElement.offsetX = event.clientX - rect.left;
      draggingElement.offsetY = event.clientY - rect.top;
    }
  }

  function stopDragging() {
    if (draggingElement) {
      draggingElement.style.cursor = "default";
      draggingElement = null;
    }
  }

  function dragElement(event) {
    if (draggingElement) {
      event.preventDefault();
      const newX = event.clientX - draggingElement.offsetX;
      const newY = event.clientY - draggingElement.offsetY;
      draggingElement.style.left = `${newX}px`;
      draggingElement.style.top = `${newY}px`;
    }
  }

  function toggleStoneState(event) {
    const target = event.target;
    if (target && target.classList.contains("stones")) {
      const value = target.getAttribute("value");
      target.setAttribute("value", value === "on" ? "off" : "on");
    }
  }
});
