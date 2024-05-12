document.addEventListener("DOMContentLoaded", function () {
  let currentCardIndex = 0;
  const cards = document.querySelectorAll(".card");
  let intervalId;

  function showCard(index) {
    cards.forEach((card) => {
      card.style.display = "none";
    });
    cards[index].style.display = "block";
  }

  function next(n) {
    currentCardIndex += n;
    if (currentCardIndex >= cards.length) {
      currentCardIndex = 0;
    } else if (currentCardIndex < 0) {
      currentCardIndex = cards.length - 1;
    }
    showCard(currentCardIndex);
  }

  function startAutoSlide() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      next(1);
    }, 5000);
  }

  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  showCard(currentCardIndex);
  startAutoSlide();

  document.querySelector(".prev").addEventListener("click", () => {
    next(-1);
    stopAutoSlide();
  });

  document.querySelector(".next").addEventListener("click", () => {
    next(1);
    stopAutoSlide();
  });
});
