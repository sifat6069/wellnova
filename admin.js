async function loadWallpapers() {

  const list = document.getElementById("wallpaperList");

  if (!list) return;

  list.innerHTML = "";

  const snapshot = await getDocs(collection(db, "wallpapers"));

  snapshot.forEach((wallpaper) => {

    const data = wallpaper.data();

    const item = document.createElement("div");

    item.style.display = "flex";
    item.style.justifyContent = "space-between";
    item.style.alignItems = "center";
    item.style.background = "#222";
    item.style.padding = "12px";
    item.style.marginBottom = "10px";
    item.style.borderRadius = "10px";

    item.innerHTML = `
      <span>${data.title}</span>
      <button
        style="
          width:auto;
          padding:8px 18px;
          background:red;
          color:white;
          border:none;
          border-radius:8px;
          cursor:pointer;
        ">
        Delete
      </button>
    `;

    const btn = item.querySelector("button");

    btn.addEventListener("click", async () => {

      if (!confirm("Delete this wallpaper?")) return;

      await deleteDoc(doc(db, "wallpapers", wallpaper.id));

      alert("Wallpaper Deleted");

      loadWallpapers();

    });

    list.appendChild(item);

  });

}
