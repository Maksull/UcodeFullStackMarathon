document.addEventListener("DOMContentLoaded", function () {
  const movies = ["TheDarkNight", "Interstellar", "TheShawshankRedemption"];
  const infoElements = movies.map((movie) => document.getElementById(movie));
  const infoSections = infoElements.map((element) =>
    document.getElementById(`info${infoElements.indexOf(element) + 1}`)
  );

  infoElements.forEach((element, index) => {
    element.addEventListener("click", function () {
      showInfo(index);
    });
  });

  function showInfo(index) {
    infoSections.forEach((section, i) => {
      if (i === index) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });
  }
});
