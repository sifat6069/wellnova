import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  query,
  where,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const wallpapers = [

  {
    title: "Mountain Lake",
    category: "Nature",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200"
  },

  {
    title: "Forest Road",
    category: "Nature",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200"
  },

  {
    title: "BMW M4",
    category: "Cars",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200"
  },

  {
    title: "Gaming RGB",
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200"
  },

  {
    title: "Galaxy",
    category: "Space",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200"
  },

  {
    title: "Black AMOLED",
    category: "AMOLED",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200"
  }

];

// =======================

async function seedDatabase() {

  let added = 0;
  let skipped = 0;

  for (const wallpaper of wallpapers) {

    // Duplicate check by title
    const q = query(
      collection(db, "wallpapers"),
      where("title", "==", wallpaper.title)
    );

    const snap = await getDocs(q);

    if (!snap.empty) {

      console.log("Skipped:", wallpaper.title);

      skipped++;

      continue;

    }

    await addDoc(collection(db, "wallpapers"), {

      ...wallpaper,

      createdAt: Date.now()

    });

    added++;

    console.log(`Added ${added}/${wallpapers.length}`);

  }

  alert(`
Finished!

Added : ${added}
Skipped : ${skipped}
Total : ${wallpapers.length}
`);

}

seedDatabase();
