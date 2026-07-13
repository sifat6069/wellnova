// WallNova

console.log("WallNova Loaded");

// Search
const searchInput = document.getElementById("searchBox");
const cards = document.querySelectorAll(".card");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        cards.forEach(card => {

            const title = card.querySelector("h3").textContent.toLowerCase();

            if (title.includes(value)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

}

// Category Button

const buttons = document.querySelectorAll(".categories button");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

    });

});

// Download Button

const downloadButtons = document.querySelectorAll(".card button");

downloadButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        alert("Download Feature Coming Soon 🚀");

    });

});
