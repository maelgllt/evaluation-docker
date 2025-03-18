document.addEventListener("DOMContentLoaded", async () => {
  const favoritesResults = document.querySelector(".favorites-results");
  const favoritesCount = document.querySelector("#favorites-count");

  try {
      const res = await fetch("http://localhost:5000/favorites");
      const data = await res.json();
      console.log(data);

      favoritesCount.textContent = `Nombre d'images : ${data.length}`;

      data.forEach((favorite) => {
          const imgDiv = document.createElement("div");
          imgDiv.classList.add("search-result");

          const img = document.createElement("img");
          img.src = favorite.imageUrl;
          img.alt = favorite.description;

          const imgLink = document.createElement("a");
          imgLink.href = favorite.imageUrl;
          imgLink.target = "_blank";
          imgLink.appendChild(img);

          imgDiv.appendChild(imgLink);
          favoritesResults.appendChild(imgDiv);
      });
  } catch (error) {
      console.error("erreur lors de la récupération des favoris", error);
  }
});
