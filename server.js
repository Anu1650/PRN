const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Gallery route with dynamic images
app.get("/gallery", (req, res) => {
  const imagesDir = path.join(__dirname, "public/images");

  fs.readdir(imagesDir, (err, files) => {
    if (err) return res.status(500).send("Error reading images folder");

    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
    const carouselItems = imageFiles.map((file, i) => `
      <div class="carousel__item">
        <img src="images/${file}" alt="Memory ${i + 1}">
        <p>Memory ${i + 1} 💕</p>
      </div>
    `).join("\n");

    const galleryHtmlPath = path.join(__dirname, "public/gallery.html");
    fs.readFile(galleryHtmlPath, "utf8", (err, data) => {
      if (err) return res.status(500).send("Error loading gallery page");
      res.send(data.replace("<!--CAROUSEL_ITEMS-->", carouselItems));
    });
  });
});

// Fallback route for page refreshes or unknown URLs
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
