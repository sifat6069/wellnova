import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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
      title: title,
      image: image,
      category: category,
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
