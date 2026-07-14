import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

console.log("✅ admin.js loaded");

// Login Check
onAuthStateChanged(auth, (user) => {
  console.log("User:", user);

  if (!user) {
    alert("Please login first.");
    window.location.href = "index.html";
  }
});

// Add Wallpaper
const saveBtn = document.getElementById("saveBtn");

console.log("Save Button:", saveBtn);

saveBtn.addEventListener("click", async () => {

  console.log("🔥 Button Clicked");

  const title = document.getElementById("title").value.trim();
  const image = document.getElementById("image").value.trim();
  const category = document.getElementById("category").value;

  console.log(title, image, category);

  if (!title || !image) {
    alert("Please fill all fields.");
    return;
  }

  try {

    console.log("Saving...");

    await addDoc(collection(db, "wallpapers"), {
      title,
      image,
      category,
      createdAt: Date.now()
    });

    console.log("Saved!");

    alert("Wallpaper Added Successfully!");

    document.getElementById("title").value = "";
    document.getElementById("image").value = "";

    loadWallpapers();

  } catch (err) {

    console.error(err);

    alert(err.message);

  }

});

async function loadWallpapers() {

  const list = document.getElementById("wallpaperList");

  if (!list) return;

  list.innerHTML = "";

  try {

    const snapshot = await getDocs(collection(db, "wallpapers"));

    snapshot.forEach((wallpaper) => {

      const data = wallpaper.data();

      const item = document.createElement("div");

      item.innerHTML = `
        <div style="
        display:flex;
        justify-content:space-between;
        background:#222;
        padding:10px;
        margin-top:10px;
        border-radius:10px;
        ">
          <span>${data.title}</span>

          <button style="background:red;color:white;border:none;padding:8px;">
          Delete
          </button>
        </div>
      `;

      item.querySelector("button").onclick = async () => {

        await deleteDoc(doc(db, "wallpapers", wallpaper.id));

        loadWallpapers();

      };

      list.appendChild(item);

    });

  } catch (err) {

    console.error(err);

  }

}

loadWallpapers();
