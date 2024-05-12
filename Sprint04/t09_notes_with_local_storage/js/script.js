const add = document.querySelector("#add");
const clear = document.querySelector("#clear");
const notes = document.querySelector("#output");

add.addEventListener("click", addToLocalStorage);
clear.addEventListener("click", clearLocalStorage);

window.addEventListener("load", () => {
  displayNotesFromLocalStorage();
});

function addToLocalStorage() {
  const textareaValue = document.querySelector("#textarea").value.trim();
  if (textareaValue === "") {
    alert(`It's empty. Try to input something in "Text input"`);
    return;
  }

  const date = new Date().toLocaleString();
  const note = `${textareaValue} [${date}]`;

  localStorage.setItem(Date.now().toString(), note);
  displayNotesFromLocalStorage();
  document.querySelector("#textarea").value = "";
}

function clearLocalStorage() {
  const question = confirm("Delete local storage?");
  if (question) {
    localStorage.clear();
    notes.innerHTML = "[Empty]";
  }
}

function displayNotesFromLocalStorage() {
  notes.innerHTML = "";
  if (localStorage.length === 0) {
    notes.innerHTML = "[Empty]";
    return;
  }

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const note = localStorage.getItem(key);
    notes.insertAdjacentHTML("beforeend", `<div>${note}</div>`);
  }
}
