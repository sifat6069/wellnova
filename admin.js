import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ===============================
// ADMIN EMAIL
// ===============================

const ADMIN_EMAIL = "khalidsaifullahsifat@gmail.com";

// ===============================
// ADMIN LOGIN CHECK
// ===============================

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    alert("Please login first.");
    window.location.href = "index.html";
    return;
  }

  if (user.email !== ADMIN_EMAIL) {

    alert("❌ Access Denied!");

    await signOut(auth);

    window.location.href = "index.html";

    return;
  }

  loadWallpapers();

});

// ===============================
// ADD WALLPAPER
// ===============================

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", async () => {

  const title = document.getElementById("title").value.trim();
  const image = document.getElementById("image").value.trim();
  const category = document.getElementById("category").value;

  if (!title || !image) {
    alert("Please fill all fields.");
    return;
  }

  try {

    await addDoc(collection(db, "wallpapers"), {
      title,
      image,
      category,
      createdAt: Date.now()
    });

    alert("✅ Wallpaper Added Successfully!");

    document.getElementById("title").value = "";
    document.getElementById("image").value = "";
    document.getElementById("category").selectedIndex = 0;

    loadWallpapers();

  } catch (err) {

    console.error(err);
    alert(err.message);

  }

});

// ===============================
// LOAD WALLPAPERS
// ===============================

async function loadWallpapers() {

  const list = document.getElementById("wallpaperList");

  if (!list) return;

  list.innerHTML = "";

  try {

    const snapshot = await getDocs(collection(db, "wallpapers"));

    if (snapshot.empty) {
      list.innerHTML = "<p>No wallpapers found.</p>";
      return;
    }

    snapshot.forEach((wallpaper) => {

      const data = wallpaper.data();

      const item = document.createElement("div");

      item.style.display = "flex";
      item.style.justifyContent = "space-between";
      item.style.alignItems = "center";
      item.style.background = "#222";
      item.style.padding = "12px";
      item.style.marginTop = "10px";
      item.style.borderRadius = "10px";

      item.innerHTML = `
        <div>
          <strong>${data.title}</strong><br>
          <small>${data.category}</small>
        </div>

        <button style="
          background:#ff3b30;
          color:white;
          border:none;
          padding:8px 18px;
          border-radius:8px;
          cursor:pointer;
        ">
          Delete
        </button>
      `;

      const deleteBtn = item.querySelector("button");

      deleteBtn.addEventListener("click", async () => {

        const ok = confirm("Delete this wallpaper?");

        if (!ok) return;

        try {

          await deleteDoc(doc(db, "wallpapers", wallpaper.id));

          alert("🗑 Wallpaper Deleted");

          loadWallpapers();

        } catch (err) {

          console.error(err);
          alert(err.message);

        }

      });

      list.appendChild(item);

    });

  } catch (err) {

    console.error(err);

    list.innerHTML = `
      <p style="color:red;">
        Failed to load wallpapers.
      </p>
    `;

  }

}
