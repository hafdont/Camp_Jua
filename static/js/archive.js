
const construction = [
  {
    title: "Progress Over the Years",
    chapter: "CHAPTER 01",
    image: "static/img/progressovertheyears.jfif",
    alt: "Early construction with earth blocks at Camp Jua",
    description: "A vision begins to take shape. The earliest stages of construction, with earth blocks prepared on the land."
  },
  {
    title: "100% Natural Building Materials",
    chapter: "CHAPTER 02",
    image: "static/img/100naturalbuildingmaterials very eco friiendly.jfif",
    alt: "Earth-block walls being constructed at Camp Jua",
    description: "Building with the earth itself. Locally made earth blocks form the walls of the emerging structure."
  },
  {
    title: "We Did It",
    chapter: "CHAPTER 03",
    image: "static/img/wedidit.jfif",
    alt: "Completed round building at Camp Jua",
    description: "From an idea to a standing structure. A milestone worth celebrating."
  }
];

const plants = [
  {
    name: "Garden Flowers",
    image: "varietyofflowers.jfif",
    description: "A colourful collection of flowering plants growing alongside the farm.",
    scientific: "Identification pending",
    kikuyu: "Name pending"
  },
  {
    name: "Leafy Greens",
    image: "colardGreens.jfif",
    description: "Fresh leafy vegetables harvested from the cultivated land.",
    scientific: "Brassica species — exact variety to verify",
    kikuyu: "Name pending"
  },
  {
    name: "Spring Onions",
    image: "morespringonions.jfif",
    description: "Green onion-like crops growing in the farm's productive beds.",
    scientific: "Allium species — exact identification to verify",
    kikuyu: "Name pending"
  },
  {
    name: "Ngwace",
    image: "ngwace.jfif",
    description: "A dark-leaved garden plant photographed at Camp Jua. Its identification needs confirmation.",
    scientific: "Identification pending",
    kikuyu: "Name pending"
  },
  {
    name: "Wild Garden Plant",
    image: "horseWeed.jpeg",
    description: "A wild-growing plant photographed in the garden, awaiting botanical identification.",
    scientific: "Identification pending",
    kikuyu: "Name pending"
  }
];

let current = 0;

const storyImage = document.querySelector("#story-image");
const storyTitle = document.querySelector("#story-title");
const storyDescription = document.querySelector("#story-description");
const storyChapter = document.querySelector("#story-chapter");
const storyCount = document.querySelector("#story-count");
const timeline = document.querySelector("#story-timeline");

function showStory(index) {
  current = (index + construction.length) % construction.length;
  const item = construction[current];

  storyImage.src = item.image;
  storyImage.alt = item.alt;
  storyTitle.textContent = item.title;
  storyDescription.textContent = item.description;
  storyChapter.textContent = item.chapter;
  storyCount.textContent =
    `${String(current + 1).padStart(2, "0")} / ${String(construction.length).padStart(2, "0")}`;

  timeline.querySelectorAll("button").forEach((button, i) => {
    button.classList.toggle("active", i === current);
    button.setAttribute("aria-current", i === current ? "step" : "false");
  });
}

construction.forEach((item, index) => {
  const button = document.createElement("button");
  button.className = "timeline-step";
  button.textContent = `${String(index + 1).padStart(2, "0")} / ${item.title}`;
  button.addEventListener("click", () => showStory(index));
  timeline.appendChild(button);
});

document.querySelector("#prev-story")
  .addEventListener("click", () => showStory(current - 1));

document.querySelector("#next-story")
  .addEventListener("click", () => showStory(current + 1));

let touchStartX = 0;

storyImage.addEventListener("touchstart", event => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

storyImage.addEventListener("touchend", event => {
  const distance = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(distance) > 45) {
    showStory(current + (distance < 0 ? 1 : -1));
  }
}, { passive: true });

document.addEventListener("keydown", event => {
  const viewer = document.querySelector(".story-viewer");
  if (!viewer.contains(document.activeElement)) return;

  if (event.key === "ArrowRight") showStory(current + 1);
  if (event.key === "ArrowLeft") showStory(current - 1);
});

const gardenGrid = document.querySelector("#garden-grid");

plants.forEach((plant, index) => {
  const card = document.createElement("article");
  card.className = "plant-card";

  const photo = document.createElement("img");
  photo.src = `static/img/${plant.image}`;
  photo.alt = plant.name + " photographed at Camp Jua";
  photo.loading = "lazy";

  const info = document.createElement("div");
  info.className = "plant-info";

  const number = document.createElement("span");
  number.className = "eyebrow";
  number.textContent = `FIELD NOTE ${String(index + 1).padStart(2, "0")}`;

  const title = document.createElement("h3");
  title.textContent = plant.name;

  const description = document.createElement("p");
  description.textContent = plant.description;

  const scientific = document.createElement("small");
  scientific.textContent = `Scientific: ${plant.scientific}`;

  const kikuyu = document.createElement("small");
  kikuyu.textContent = `Kikuyu: ${plant.kikuyu}`;

  info.append(number, title, description, scientific, kikuyu);
  card.append(photo, info);
  gardenGrid.appendChild(card);
});

showStory(0);

static/img