import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// khalidsaifullahsifat@gmail.com
const ADMIN_EMAIL = "khalidsaifullahsifat@gmail.com";

// Admin Check
onAuthStateChanged(auth, (user) => {

  if (!user) {
    alert("Please login first.");
    window.location.href = "index.html";
    return;
  }

  if (user.email !== ADMIN_EMAIL) {
    alert("Access Denied");
    window.location.href = "index.html";
    return;
  }

});

// Save Wallpaper
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

  } catch (err) {

    console.error(err);
    alert(err.message);

  }

});
