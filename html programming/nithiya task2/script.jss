const imageForm = document.getElementById("imageForm");
const gallery = document.getElementById("gallery");
const filters = document.querySelector(".filters");

const images = [];

imageForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const url = document.getElementById("imageUrl").value.trim();
  const title = document.getElementById("imageTitle").value.trim();
  const category = document.getElementById("imageCategory").value;

  if (!url || !title || !category) {
    alert("Please fill in all fields.");
    return;
  }

  images.push({ url, title, category });
  renderGallery(images);
  imageForm.reset();
});

filters.addEventListener("click", function (e) {
  if (e.target.tagName !== "BUTTON") return;

  const category = e.target.dataset.category;

  if (category === "All") {
    renderGallery(images);
  } else {
    const filteredImages = images.filter(
      image => image.category === category
    );
    renderGallery(filteredImages);
  }
});

function renderGallery(imageList) {
  gallery.innerHTML = "";

  imageList.forEach(image => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${image.url}" alt="${image.title}">
      <h3>${image.title}</h3>
      <p>${image.category}</p>
    `;

    gallery.appendChild(card);
  });
}
