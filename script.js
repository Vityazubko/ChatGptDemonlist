// ====== СЕКЦІЇ ======
function showSection(name){
  ["levels","players","updates"].forEach(s=>{
    document.getElementById(s+"Section").classList.add("hidden");
  });
  document.getElementById(name+"Section").classList.remove("hidden");
}

// ====== ОЧКИ ======
function pointsForRank(rank){
  if(rank===1) return 350;
  if(rank===2) return 325;
  if(rank===3) return 300;
  if(rank===4) return 285;
  if(rank===5) return 270;
  if(rank===6) return 260;
  if(rank===7) return 250;
  if(rank===8) return 245;
  return Math.max(50,245-(rank-8)*5);
}

// ====== РІВНІ ======
const levels = [
  {rank:1,name:"Xeuweu",author:"Xeuweu",verifier:"Xeuweu",type:"fan",time:"2:05",avatar:""},
  {rank:2,name:"Tidal Wave",author:"OniLink",verifier:"Ryamu",type:"pointer",time:"2:10",avatar:""},
  {rank:3,name:"Query",author:"QueryDev",verifier:"Hopii",type:"fan",time:"1:58",avatar:""},
  {rank:4,name:"Slaughterhouse Rebirth",author:"icedcave",verifier:"Zoink",type:"fan",time:"2:20",avatar:""},
  {rank:5,name:"Acheron",author:"Ryamu",verifier:"OniLink",type:"pointer",time:"1:55",avatar:""},
  {rank:6,name:"Avernus",author:"Bo",verifier:"Zoink",type:"pointer",time:"2:15",avatar:""},
  {rank:7,name:"Amethyst",author:"Endevvor",verifier:"GGsBoy",type:"pointer",time:"1:42",avatar:""},
  {rank:8,name:"Flamewall",author:"Bianox",verifier:"ItsHybrid",type:"pointer",time:"1:50",avatar:""},
  {rank:9,name:"Slaughterhouse",author:"icedcave",verifier:"Zoink",type:"pointer",time:"2:30",avatar:""},
  {rank:10,name:"Oblivion",author:"Riot",verifier:"Trick",type:"pointer",time:"2:45",avatar:""},
  {rank:11,name:"Liptogen",author:"MasterCreaster",verifier:"Hopii",type:"fan",time:"2:05",avatar:""},
  {rank:12,name:"Thinking Space II",author:"Atomic",verifier:"Knobbelboy",type:"pointer",time:"2:40",avatar:""},
  {rank:13,name:"VOID ASCENSION",author:"Xeuweu",verifier:"GGsBoy",type:"fan",time:"2:10",avatar:""},
  {rank:14,name:"Cat Molodets",author:"MeowCatMurcyk and Vityapro12",verifier:"Vityapro12",type:"fan",time:"1:20",avatar:"C:\Users\User\Downloads\Cat Molodets top 14.png"},
  {rank:15,name:"Void Spiral",author:"Xeuweu",verifier:"Vityapro12",type:"fan",time:"2:00",avatar:""},
  {rank:16,name:"NEURAL COLLAPSE",author:"GGsBoy",verifier:"Xeuweu",type:"fan",time:"2:30",avatar:""},
  {rank:17,name:"Spectral Core",author:"Xapped",verifier:"Vityapro12",type:"fan",time:"2:15",avatar:""},
  {rank:18,name:"SILENT HORIZON X",author:"MythDev",verifier:"Lonid",type:"fan",time:"2:50",avatar:""},
  {rank:19,name:"Neon Horizon",author:"Lonid",verifier:"Lonid",type:"fan",time:"1:55",avatar:""},
  {rank:20,name:"Black Sun Zenith",author:"Rob",verifier:"Rob",type:"fan",time:"3:00",avatar:""}
];

let currentFilter="all";

// ====== РЕНДЕР РІВНІВ ======
const levelsDiv=document.getElementById("levels");

function renderLevels(){
  levelsDiv.innerHTML="";
  levels
    .filter(l=>currentFilter==="all"||l.type===currentFilter)
    .sort((a,b)=>a.rank-b.rank)
    .forEach(l=>{
      const d=document.createElement("div");
      d.className="level";
      d.innerHTML=`
        <img class="avatar" src="${l.avatar}">
        <div>
          <b>#${l.rank} ${l.name}</b><br>
          Автор: ${l.author} • Verifier: ${l.verifier}
        </div>
      `;
      d.onclick=()=>openModal(`
        <h3>${l.name}</h3>
        ⏱ Тривалість: ${l.time}<br>
        🧠 Очки: ${pointsForRank(l.rank)}<br>
        Тип: ${l.type}
      `);
      levelsDiv.appendChild(d);
    });
}

function filterType(type){
  currentFilter=type;
  renderLevels();
}

renderLevels();

// ====== ГРАВЦІ ======
const players = {
  "Vityapro12": {
    created:["Cat Molodets"],
    verified:["Void Spiral","Cat Molodets","Spectral Core"],
    passed:["Amethyst","Flamewall","Slaughterhouse","Oblivion"], // пройшли чужі рівні
    pts:0
  },
  "GGsBoy": {
    created:["NEURAL COLLAPSE"],
    verified:["Amethyst","VOID ASCENSION"],
    passed:["Spectral Core"],
    pts:0
  },
  "Xeuweu": {
    created:["Xeuweu","VOID ASCENSION","Void Spiral"],
    verified:["Xeuweu","Neural Collapse"],
    passed:["Amethyst","Oblivion","VOID ASCENSION"],
    pts:0
  },
  "MeowCatMurcyk": {
    created:["Cat Molodets"],
    verified:[],
    passed:["Flamewall","NEURAL COLLAPSE"],
    pts:0
  },
  "Lonid": {
    created:["Neon Horizon"],
    verified:["Neon Horizon","SILENT HORIZON X"],
    passed:["Amethyst"],
    pts:0
      },
  "Zoink": {
    created:[],
    verified:["Slaughterhouse Rebirth","Avernus","Slaughterhouse"],
    passed:["Amethyst,Flamewall,Thinking Space II"],
    pts:0
       },
  "Ryamu": {
    created:["Acheron"],
    verified:["Tidal Wave"],
    passed:["Query","Slaughterhouse Rebirth","Slaughterhouse"],
    pts:0
         },
  "OniLink": {
    created:["Tidal Wave"],
    verified:["Acheron"],
    passed:["SILENT HORIZON X","Slaughterhouse"],
    pts:0
  }
};

// ====== РАХУНОК ОЧОК ======
Object.keys(players).forEach(p=>{
  // проходження чужих рівнів
  players[p].passed.forEach(lname=>{
    const lvl = levels.find(l=>l.name===lname);
    if(lvl && lvl.author !== p){
      players[p].pts += pointsForRank(lvl.rank);
    }
  });
  // очки за верифікацію (x2)
  players[p].verified.forEach(lname=>{
    const lvl = levels.find(l=>l.name===lname);
    if(lvl){
      players[p].pts += pointsForRank(lvl.rank)*2;
    }
  });
});

// ====== РЕНДЕР ГРАВЦІВ ======
const playersDiv=document.getElementById("players");

Object.entries(players)
  .sort((a,b)=>b[1].pts - a[1].pts)
  .forEach(([name,data],i)=>{
    const d=document.createElement("div");
    d.className="player";
    d.innerHTML=`<b>#${i+1} ${name}</b> — ${data.pts} pts`;
    d.onclick=()=>openModal(`
      <h3>${name}</h3>
      🏗 Зробив: ${data.created.join(", ")||"—"}<br>
      ✅ Verifнув: ${data.verified.join(", ")||"—"}<br>
      🏆 Пройшов: ${data.passed.join(", ")||"—"}
    `);
    playersDiv.appendChild(d);
  });

// ====== МОДАЛКА ======
function openModal(content){
  document.getElementById("modal").style.display="flex";
  document.getElementById("modalBody").innerHTML = content;
}

function showLevelModal(level){
  const html = `
    <img class="avatar-large" src="${level.avatar || ''}">
    <h3>${level.name}</h3>
    <div class="info-block">
      <b>Автор:</b> <span>${level.author}</span><br>
      <b>Verifier:</b> <span>${level.verifier}</span><br>
      <b>Тип:</b> <span>${level.type}</span><br>
      <b>Очки:</b> <span>${pointsForRank(level.rank)}</span><br>
      <b>Тривалість:</b> <span>${level.time}</span>
    </div>
  `;
  openModal(html);
}

function showPlayerModal(playerName){
  const data = players[playerName];
  const html = `
    <h3>${playerName}</h3>
    <div class="info-block">
      <b>Зробив:</b>
      <div class="tag-list">${data.created.map(l=>`<div class="tag">${l}</div>`).join("")}</div>
    </div>
    <div class="info-block">
      <b>Verifнув:</b>
      <div class="tag-list">${data.verified.map(l=>`<div class="tag">${l}</div>`).join("")}</div>
    </div>
    <div class="info-block">
      <b>Пройшов:</b>
      <div class="tag-list">${data.passed.map(l=>`<div class="tag">${l}</div>`).join("")}</div>
    </div>
    <div class="info-block">
      <b>Загальні очки:</b> <span>${data.pts}</span>
    </div>
  `;
  openModal(html);
}

// ====== РЕНДЕР РІВНІВ ======
function renderLevels(){
  levelsDiv.innerHTML="";
  levels
    .filter(l=>currentFilter==="all"||l.type===currentFilter)
    .sort((a,b)=>a.rank-b.rank)
    .forEach(l=>{
      const d=document.createElement("div");
      d.className="level";
      d.innerHTML=`
        <img class="avatar" src="${l.avatar}">
        <div>
          <b>#${l.rank} ${l.name}</b><br>
          Автор: ${l.author} • Verifier: ${l.verifier}
        </div>
      `;
      d.onclick = ()=>showLevelModal(l);
      levelsDiv.appendChild(d);
    });
}

// ====== РЕНДЕР ГРАВЦІВ ======
Object.entries(players)
  .sort((a,b)=>b[1].pts - a[1].pts)
  .forEach(([name,data],i)=>{
    const d=document.createElement("div");
    d.className="player";
    d.innerHTML=`<b>#${i+1} ${name}</b> — ${data.pts} pts`;
    d.onclick = ()=>showPlayerModal(name);
    playersDiv.appendChild(d);
  });
