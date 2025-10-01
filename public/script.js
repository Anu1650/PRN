// ------------------------- BACKGROUND COLOR -------------------------
function changeColors() {
  const body = document.body;
  const color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 85%)`;
  body.style.background = color;
}
setInterval(changeColors, 5000);

// ------------------------- TYPING ANIMATION -------------------------
let text = "Every moment with you is a treasure worth keeping...";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typed-text").innerHTML = text.substring(0, i + 1);
    i++;
    setTimeout(typeWriter, 50);
  } else {
    setTimeout(() => {
      i = 0;
      document.getElementById("typed-text").innerHTML = "";
      typeWriter();
    }, 5000);
  }
}

// ------------------------- HEART PARTICLE ANIMATION -------------------------
function hearts() {
  const canvas = document.getElementById("heart-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const heartsArr = [];
  for (let i = 0; i < 60; i++) {
    heartsArr.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 10 + 5,
      speed: Math.random() * 1 + 0.5,
      opacity: Math.random()
    });
  }

  function drawHeart(x, y, size, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 15, size / 15);
    ctx.beginPath();
    ctx.globalAlpha = opacity;
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -3, -5, -15, -15, -15);
    ctx.bezierCurveTo(-35, -15, -35, 10, -35, 10);
    ctx.bezierCurveTo(-35, 25, -20, 40, 0, 55);
    ctx.bezierCurveTo(20, 40, 35, 25, 35, 10);
    ctx.bezierCurveTo(35, 10, 35, -15, 15, -15);
    ctx.bezierCurveTo(5, -15, 0, -3, 0, 0);
    ctx.fillStyle = "#ff5e99";
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    heartsArr.forEach(h => {
      drawHeart(h.x, h.y, h.size, h.opacity);
      h.y -= h.speed;
      if (h.y < -50) h.y = canvas.height + 50;
    });
    requestAnimationFrame(animate);
  }

  animate();
}

// ------------------------- INIT -------------------------
window.onload = function () {
  typeWriter();
  hearts();

  const music = document.getElementById("bg-music");
  music.volume = 0.3;
  document.body.addEventListener('click', () => music.play());
};
