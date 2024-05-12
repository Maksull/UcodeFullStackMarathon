const addToCookiesButton = document.querySelector("#addToCookies");
const clearCookiesButton = document.querySelector("#clearCookies");
const notesOutput = document.querySelector("#output");

addToCookiesButton.addEventListener("click", addToCookies);
clearCookiesButton.addEventListener("click", clearCookies);
window.addEventListener("load", updateNotes);

function addToCookies() {
  const text = document.querySelector("#cookieTextInput").value.trim();
  
  if (text === "") return;

  const cookieDate = new Date();
  cookieDate.setFullYear(cookieDate.getFullYear() + 1);
  document.cookie = `${text}=${text};expires=${cookieDate.toUTCString()}`;

  updateNotes();
  document.querySelector("#cookieTextInput").value = "";
}

function clearCookies() {
  const question = confirm("Delete cookies?");
  if (!question) return;

  const cookies = document.cookie.split(";");
  cookies.forEach((cookie) => {
    const cookieParts = cookie.split("=");
    const cookieName = cookieParts[0].trim();
    document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  });

  updateNotes();
}

function updateNotes() {
  const cookies = document.cookie.split(";");
  if (cookies.length === 0) {
    notesOutput.innerHTML = "[Empty]";
  } else {
    notesOutput.innerHTML = cookies
      .map((cookie) => {
        const key = cookie.split("=")[0].trim();
        return `<div>--> ${key}</div>`;
      })
      .join("");
  }
}
