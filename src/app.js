const carousel = ($container, images) => {
  let $carouselSlides = null;
  let currentSlide = 0;
  let isMoving = false;

  let timerId = null;
  const DURATION = 500;

  const move = (currentSlide, duration = 0) => {
    if (duration) isMoving = true;
    $carouselSlides.style.setProperty("--duration", duration);
    $carouselSlides.style.setProperty("--currentSlide", currentSlide);
  };

  document.addEventListener("DOMContentLoaded", () => {
    $container.innerHTML = `
      <div class="carousel-slides">
      ${[images[images.length - 1], ...images, images[0]]
        .map((url) => `<img src="${url}" />`)
        .join("")}
      </div>
      <button class="carousel-control prev">&laquo;</button>
      <button class="carousel-control next">&raquo;</button>
    `;

    $carouselSlides = document.querySelector(".carousel-slides");
  });

  window.onload = () => {
    const { offsetWidth } = $carouselSlides.querySelector("img");
    $container.style.width = `${offsetWidth}px`;

    move(++currentSlide);
    $container.style.opacity = 1;

    // Autoplay
    timerId = setInterval(() => move(++currentSlide, DURATION), 3000);
  };

  $container.onclick = ({ target }) => {
    if (!target.classList.contains("carousel-control") || isMoving) return;

    clearInterval(timerId);

    const delta = target.classList.contains("prev") ? -1 : 1;
    currentSlide += 1 * delta;
    move(currentSlide, DURATION);
  };

  $container.ontransitionend = () => {
    isMoving = false;

    const delta =
      currentSlide === 0 ? 1 : currentSlide === images.length + 1 ? -1 : 0;

    if (!delta) return;

    currentSlide += images.length * delta;
    move(currentSlide);
  };
};

carousel(document.querySelector(".carousel"), [
  "movies/movie-1.jpg",
  "movies/movie-2.jpg",
  "movies/movie-3.jpg",
  "movies/movie-4.jpg",
]);
