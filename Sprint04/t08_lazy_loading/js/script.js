document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img.lazy");
  const numLoaded = document.getElementById("num");
  const totalImages = lazyImages.length;
  let loadedCount = 0;
  let finishedLoading = false;

  function lazyLoadImages() {
    const scrollTop = window.pageYOffset;

    lazyImages.forEach(function (img) {
      if (img.offsetTop < window.innerHeight + scrollTop) {
        if (!img.classList.contains("loaded")) {
          img.src = img.dataset.src;
          img.classList.add("loaded");
          loadedCount++;

          numLoaded.textContent = loadedCount;

          if (loadedCount === totalImages && !finishedLoading) {
            finishedLoading = true;
            const label = document.querySelector("label");
            label.classList.add("finish");
            setTimeout(function () {
              label.style.display = "none";
            }, 3000);
          }
        }
      }
    });

    if (loadedCount === totalImages) {
      document.removeEventListener("scroll", lazyLoadImages);
    }
  }

  document.addEventListener("scroll", lazyLoadImages);
});
