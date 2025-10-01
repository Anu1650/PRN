window.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll('.carousel__item');
  const totalItems = items.length;

  function updateCarousel() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Increase radius to create more gap between images
    const radius = Math.min(screenWidth, screenHeight) / 1.8; // smaller divisor = bigger gap

    const imgWidth = Math.min(250, screenWidth / 4);
    const imgHeight = imgWidth * 1.4;

    items.forEach((item, i) => {
      const angle = (360 / totalItems) * i; // rotation angle
      item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
      item.style.width = imgWidth + 'px';
      item.style.height = imgHeight + 'px';
      item.style.marginLeft = -(imgWidth / 2) + 'px';
      item.style.marginTop = -(imgHeight / 2) + 'px';
    });
  }

  updateCarousel();
  window.addEventListener("resize", updateCarousel);
});
