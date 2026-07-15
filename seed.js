import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const wallpapers = [

{
title:"Mountain Lake",
category:"Nature",
image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200"
},

{
title:"Forest Road",
category:"Nature",
image:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200"
},

{
title:"Green Valley",
category:"Nature",
image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200"
},

{
title:"Sunset Beach",
category:"Nature",
image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200"
},

{
title:"Blue River",
category:"Nature",
image:"https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200"
},

{
title:"Autumn Forest",
category:"Nature",
image:"https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200"
},

{
title:"Rocky Hills",
category:"Nature",
image:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200"
},

{
title:"Beautiful Lake",
category:"Nature",
image:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200"
},

{
title:"Green Hills",
category:"Nature",
image:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200"
},

{
title:"Ocean Waves",
category:"Nature",
image:"https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200"
}

];

async function seedDatabase(){

for(const wallpaper of wallpapers){

await addDoc(collection(db,"wallpapers"),wallpaper);

console.log("Added:",wallpaper.title);

}

alert("✅ Nature Wallpapers Added Successfully!");

}

seedDatabase();
