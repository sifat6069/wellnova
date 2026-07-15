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
},

{
title:"Misty Forest",
category:"Nature",
image:"https://images.unsplash.com/photo-1511497584788-876760111969?w=1200"
},
{
title:"Golden Sunset",
category:"Nature",
image:"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200"
},
{
title:"Peaceful Lake",
category:"Nature",
image:"https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200"
},
{
title:"Green Mountains",
category:"Nature",
image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200"
},
{
title:"River View",
category:"Nature",
image:"https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200"
},
{
title:"BMW M8",
category:"Cars",
image:"https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200"
},
{
title:"Audi R8",
category:"Cars",
image:"https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200"
},
{
title:"Mercedes AMG",
category:"Cars",
image:"https://images.unsplash.com/photo-1494905998402-395d579af36f?w=1200"
},
{
title:"Porsche 911",
category:"Cars",
image:"https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200"
},
{
title:"Ferrari Red",
category:"Cars",
image:"https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200"
},
{
title:"Gaming RGB",
category:"Gaming",
image:"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200"
},
{
title:"Gaming Mouse",
category:"Gaming",
image:"https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1200"
},
{
title:"Gaming Keyboard",
category:"Gaming",
image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200"
},
{
title:"Gaming Monitor",
category:"Gaming",
image:"https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=1200"
},
{
title:"Gaming Room",
category:"Gaming",
image:"https://images.unsplash.com/photo-1603481546579-65d935ba9cdd?w=1200"
},
{
title:"Milky Way",
category:"Space",
image:"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200"
},
{
title:"Blue Galaxy",
category:"Space",
image:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200"
},
{
title:"Deep Space",
category:"Space",
image:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200"
},
{
title:"Planet Earth",
category:"Space",
image:"https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1200"
},
{
title:"Stars Night",
category:"Space",
image:"https://images.unsplash.com/photo-1538370965046-79c0d6907d47?w=1200"
},
{
title:"Black Sky",
category:"AMOLED",
image:"https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1200"
},
{
title:"Dark Forest",
category:"AMOLED",
image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200"
},
{
title:"Night Moon",
category:"AMOLED",
image:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200"
},
{
title:"Dark Ocean",
category:"AMOLED",
image:"https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200"
},
{
title:"Black Mountain",
category:"AMOLED",
image:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200"
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
