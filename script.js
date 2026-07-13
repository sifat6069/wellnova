// =============================
// WallNova v1.0
// =============================

console.log("WallNova Loaded");

// Search Box
const searchInput = document.querySelector(".search-box input");
const cards = document.querySelectorAll(".card");

searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    cards.forEach(card => {

        const title = card.querySelector("h3").textContent.toLowerCase();

        if(title.includes(value)){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }

    });

});


// Category Button Animation

const buttons = document.querySelectorAll(".categories button");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

buttons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

});

});


// Download Button

const downloadButtons=document.querySelectorAll(".card a");

downloadButtons.forEach(btn=>{

btn.addEventListener("click",function(e){

e.preventDefault();

alert("Download Feature Coming Soon 🚀");

});

});
