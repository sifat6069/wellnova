// ===============================
// PEXELS API
// ===============================

const API_KEY = "oeCD73YhbmBgbuMliS2AV6LpVkmqTqd0X37oLyftyros7wAJfl7CCrgl";

const gallery = document.querySelector(".gallery");

let currentPage = 1;
let currentCategory = "Nature";

// ===============================
// LOAD WALLPAPERS
// ===============================

async function loadWallpapers(category = "Nature", page = 1) {

    currentCategory = category;

    const url =
`https://api.pexels.com/v1/search?query=${category}&per_page=24&page=${page}`;

    const res = await fetch(url, {

        headers: {

            Authorization: API_KEY

        }

    });

    const data = await res.json();

    if(page === 1){

        gallery.innerHTML = "";

    }

    data.photos.forEach(photo=>{

        gallery.innerHTML += `

        <div class="card">

            <img src="${photo.src.large2x}" alt="${photo.photographer}">

            <h3>${photo.photographer}</h3>

            <button onclick="downloadImage('${photo.src.original}')">
                Download
            </button>

        </div>

        `;

    });

}

// ===============================
// DOWNLOAD
// ===============================

window.downloadImage = function(url){

    window.open(url,"_blank");

}

// ===============================
// CATEGORY BUTTONS
// ===============================

document.querySelectorAll(".categories button").forEach(btn=>{

    btn.onclick = ()=>{

        currentPage = 1;

        loadWallpapers(btn.dataset.category);

    };

});

// ===============================
// FIRST LOAD
// ===============================

loadWallpapers("Nature");
