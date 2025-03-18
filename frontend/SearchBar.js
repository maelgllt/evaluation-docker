const formElt = document.querySelector("form");
const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector(".search-results");
const showMoreButton = document.querySelector("#show-more");
const favoritesButton = document.querySelector("#favorites-btn");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = searchInput.value;
    const url = `http://localhost:5000/search?page=${page}&query=${inputData}&lang=fr`;

    const res = await fetch(url);
    const data = await res.json();
    if (page === 1){
        searchResults.innerHTML = "";
    }

    console.log(data);

    const results = data.results;

    results.map((result) => {
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("search-result");

        const imgLink = document.createElement("a");
        imgLink.href = result.links.html;
        imgLink.target = "_blank";

        const img = document.createElement("img");
        img.src = result.urls.small;
        if (result.description) {
            img.alt = result.description;
        } else {
            img.alt = "Image sans description";
        }

        const favoriteButton = document.createElement("button");
        favoriteButton.innerHTML = "❤️"; 
        favoriteButton.classList.add("favorite-btn");
        favoriteButton.addEventListener("click", () => addToFavorites(result));

        imgLink.appendChild(img); 
        imgDiv.appendChild(imgLink); 
        imgDiv.appendChild(favoriteButton);

        searchResults.appendChild(imgDiv);
    });

    page++;

    if(page > 1){
        showMoreButton.style.display = "block";
    }
}

async function addToFavorites(image) {
    try {
        await fetch("http://localhost:5000/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                imageUrl: image.urls.small,
                description: image.description || "Image sans description"
            })
        });
        alert("image ajoutée aux favoris");
    } catch (error) {
        console.error("erreur lors de l'ajout aux favoris", error);
    }
}

favoritesButton.addEventListener("click", () => {
    window.open("favorites.html", "_blank");
});

formElt.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreButton.addEventListener("click", () => {
    searchImages();
});


formElt.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreButton.addEventListener("click", () => {
    searchImages();
})