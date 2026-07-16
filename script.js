console.log("script.js loaded");
// ================================
// WallNova v2.0
// Pexels API
// ================================

const API_KEY = "oeCD73YhbmBgbuMliS2AV6LpVkmqTqd0X37oLyftyros7wAJfl7CCrgl";

const gallery = document.querySelector(".gallery");
const searchBox = document.getElementById("searchBox");

let currentCategory = "Nature";
let currentPage = 1;
let loading = false;

// ================================
// Load Wallpapers
// ================================

async function loadWallpapers(category = "Nature", page = 1) {

    if (loading) return;

    loading = true;

    document.getElementById("loading").style.display = "block";

    try {

        const response = await fetch(

            `https://api.pexels.com/v1/search?query=${category}&per_page=24&page=${page}`,

            {

                headers: {

                    Authorization: API_KEY

                }

            }

        );

        console.log(response.status);

        const data = await response.json();

        console.log(data);
        
        console.log(data);
        
        console.log(data.photos.length);
        
        if (page === 1) {

            gallery.innerHTML = "";

        }

        data.photos.forEach(photo => {

            gallery.innerHTML += `

            <div class="card">

              <div class="card">

<img
src="${photo.src.large2x}"
alt="${photo.alt}"
onclick="previewWallpaper('${photo.src.original}')"
style="cursor:pointer;">

<h3>${photo.photographer}</h3>

<div class="actions">

<button onclick="downloadWallpaper('${photo.src.original}')">
⬇ Download
</button>

<button onclick="this.innerHTML='❤️ Liked'">
🤍 Like
</button>

</div>

</div>

            `;

        });

    } catch (error) {

        console.error(error);

    }

    document.getElementById("loading").style.display = "none";

    loading = false;

}

// ================================
// Download
// ================================

window.downloadWallpaper = function(url){

    window.open(url,"_blank");

};

// ================================
// First Load
// ================================

loadWallpapers();

// ===================================
// CATEGORY BUTTONS
// ===================================

document.querySelectorAll(".categories button").forEach(button => {

    button.addEventListener("click", () => {

        currentCategory = button.dataset.category;

        currentPage = 1;

        loadWallpapers(currentCategory, currentPage);

    });

});

// ===================================
// SEARCH
// ===================================

searchBox.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        currentCategory = searchBox.value.trim();

        currentPage = 1;

        loadWallpapers(currentCategory, currentPage);

    }

});

// ===================================
// INFINITE SCROLL
// ===================================

window.addEventListener("scroll", () => {

    if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
    ) {

        currentPage++;

        loadWallpapers(currentCategory, currentPage);

    }

});

// ======================================
// FULL SCREEN IMAGE
// ======================================

window.previewWallpaper = function(url){

    const preview = document.createElement("div");

    preview.style.position="fixed";
    preview.style.left="0";
    preview.style.top="0";
    preview.style.width="100%";
    preview.style.height="100%";
    preview.style.background="rgba(0,0,0,.95)";
    preview.style.display="flex";
    preview.style.alignItems="center";
    preview.style.justifyContent="center";
    preview.style.zIndex="99999";

    preview.innerHTML=`

        <img
        src="${url}"
        style="
        max-width:95%;
        max-height:95%;
        border-radius:15px;
        ">

    `;

    preview.onclick=()=>preview.remove();

    document.body.appendChild(preview);

};
