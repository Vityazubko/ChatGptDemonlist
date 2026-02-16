function removeDuplicateUIBlocks(){
  ["header", "nav", "#levelsFilters"].forEach(selector => {
    const items = Array.from(document.querySelectorAll(selector));
    items.slice(1).forEach(node => node.remove());
  });
}

// ====== СЕКЦІЇ ======
function showSection(name){
  ["levels","players","updates"].forEach(s=>{
    document.getElementById(s+"Section").classList.add("hidden");
  });
  document.getElementById(name+"Section").classList.remove("hidden");

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.section === name);
  });

  const filters = document.getElementById("levelsFilters");
  if (filters) filters.classList.toggle("hidden", name !== "levels");
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
  {rank:2,name:"Tidal Wave",author:"OniLink",verifier:"Ryamu",type:"pointer",time:"2:10",avatar:"avatars/TidalWave.jpg"},
  {rank:3,name:"Query",author:"QueryDev",verifier:"Hopii",type:"fan",time:"1:58",avatar:""},
  {rank:4,name:"Slaughterhouse Rebirth",author:"icedcave",verifier:"Zoink",type:"fan",time:"2:20",avatar:""},
  {rank:5,name:"CXT MOLODETS",author:"MeowCatMurcyk",verifier:"Vityapro12",type:"fan",time:"1:20",avatar:""},
  {rank:6,name:"Kioker Per Ker",author:"Kioker",verifier:"GGsBoy",type:"fan",time:"0:55",avatar:""},
  {rank:7,name:"Boobawamba",author:"Akunashark",verifier:"Fled",type:"pointer",time:"2:34",avatar:"avatars/Boobawaba.jpg"},
  {rank:8,name:"Acheron",author:"Ryamu",verifier:"OniLink",type:"pointer",time:"1:55",avatar:"avatars/Acheron.jpg"},
  {rank:9,name:"Avernus",author:"Bo",verifier:"Zoink",type:"pointer",time:"2:15",avatar:"avatars/Avernus.jpg"},
  {rank:10,name:"andromeda",author:"Inxsane",verifier:"bkold",type:"pointer",time:"1:31",avatar:"avatars/andromeda_gd.jpg"},
  {rank:11,name:"Amethyst",author:"Endevvor",verifier:"GGsBoy",type:"pointer",time:"1:42",avatar:"avatars/amethyst.jpg"},
  {rank:12,name:"Silest World",author:"Silest",verifier:"Lonid",type:"fan",time:"2:05",avatar:""},
  {rank:13,name:"Flamewall",author:"Bianox",verifier:"ItsHybrid",type:"pointer",time:"1:50",avatar:"avatars/Flamewall.jpg"},
  {rank:14,name:"Slaughterhouse",author:"icedcave",verifier:"Zoink",type:"pointer",time:"2:30",avatar:"avatars/Slaughterhouse.jpg"},
  {rank:15,name:"Nullscape",author:"ItzKiba",verifier:"Zoink",type:"pointer",time:"1:34",avatar:"avatars/Nullscapes.jpg"},
  {rank:16,name:"Oblivion",author:"Riot",verifier:"Trick",type:"pointer",time:"2:45",avatar:"avatars/Oblivion.jpg"},
  {rank:17,name:"Anathema",author:"MisterCreaster",verifier:"WhizKid",type:"pointer",time:"2:38",avatar:"avatars/Anathema.jpg"},
  {rank:18,name:"Liptogen",author:"MasterCreaster",verifier:"Hopii",type:"fan",time:"2:05",avatar:""},
  {rank:19,name:"Thinking Space II",author:"Atomic",verifier:"Knobbelboy",type:"pointer",time:"2:40",avatar:"avatars/ts2.jpg"},
  {rank:20,name:"INCREMENT",author:"iceteam",verifier:"Vityapro12",type:"fan",time:"2:30",avatar:""},
  {rank:21,name:"VOID ASCENSION",author:"Xeuweu",verifier:"GGsBoy",type:"fan",time:"2:10",avatar:""},
  {rank:22,name:"Cat Molodets",author:"MeowCatMurcyk",verifier:"Vityapro12",type:"fan",time:"1:20",avatar:""},
  {rank:23,name:"Qwilt",author:"iceteam",verifier:"Knobbelboy",type:"fan",time:"1:20",avatar:""},
  {rank:24,name:"Void Spiral",author:"Xeuweu",verifier:"Vityapro12",type:"fan",time:"2:00",avatar:""},
  {rank:25,name:"NEURAL COLLAPSE",author:"GGsBoy",verifier:"Xeuweu",type:"fan",time:"2:30",avatar:""},
  {rank:26,name:"Spectral Core",author:"Xapped",verifier:"Vityapro12",type:"fan",time:"2:15",avatar:""},
  {rank:27,name:"SILENT HORIZON X",author:"MythDev",verifier:"Lonid",type:"fan",time:"2:50",avatar:""},
  {rank:28,name:"Neon Horizon",author:"Lonid",verifier:"Lonid",type:"fan",time:"1:55",avatar:""},
  {rank:29,name:"Black Sun Zenith",author:"Rob",verifier:"Rob",type:"fan",time:"3:00",avatar:""},
  {rank:30,name:"Silent World",author:"Silest",verifier:"Lonid",type:"fan",time:"2:30",avatar:""}
];

const badgeInfo = {
  top1: { label: "Топ 1", icon: "👑", desc: "Зараз або колись був на першому місці." },
  sequel: { label: "Sequel", icon: "🧩", desc: "Це сиквел (продовження) іншого рівня." },
  verifier: { label: "Веріфаєр", icon: "✅", desc: "Гравець верифнув хоча б один рівень." },
  creator: { label: "Креатор", icon: "🛠️", desc: "Гравець створив хоча б один рівень." }
};

const levelBadgeRules = {
  top1: new Set(["Xeuweu", "Tidal Wave"]),
  sequel: new Set(["Slaughterhouse Rebirth", "CXT MOLODETS", "Silest World"])
};

const playerTopOne = new Set(["Zoink", "Vityapro12", "Xeuweu"]);

function renderBadges(badges){
  return badges.map(b => {
    const info = badgeInfo[b.type] || { label: b.label, icon: "🏷️", desc: "Бейдж" };
    const title = `${info.label} — ${info.desc}`;
    return `<span class="badge badge-${b.type}" title="${title}" aria-label="${title}"><span class="badge-icon" aria-hidden="true">${info.icon}</span><span>${info.label}</span></span>`;
  }).join("");
}

function getLevelBadges(level){
  const badges = [];
  if (levelBadgeRules.top1.has(level.name)) badges.push({ type: "top1" });
  if (levelBadgeRules.sequel.has(level.name)) badges.push({ type: "sequel" });
  return badges;
}

function getPlayerBadges(name, data){
  const badges = [];
  if (data.verified.length > 0) badges.push({ type: "verifier" });
  if (data.created.length > 0) badges.push({ type: "creator" });
  if (playerTopOne.has(name)) badges.push({ type: "top1" });
  return badges;
}

function getHardestPassedLevel(data){
  return data.passed
    .map(levelName => levels.find(l => l.name === levelName))
    .filter(Boolean)
    .sort((a, b) => a.rank - b.rank)[0] || null;
}

function getLevelPassers(levelName){
  return Object.entries(players)
    .filter(([, data]) => data.passed.includes(levelName))
    .map(([playerName]) => playerName);
}

let currentFilter="all";
function setFilter(type){
  currentFilter = type;

  document.querySelectorAll(".filters button")
    .forEach(b => b.classList.remove("active"));

  const activeBtn = document.getElementById("btn-" + type);
  if (activeBtn) activeBtn.classList.add("active");

  renderLevels();
}


// ====== ГРАВЦІ (вручну) ======
const players = {
    "Vityapro12": {
    created:["Cat Molodets"],
    verified:["Void Spiral","Cat Molodets","Spectral Core","CXT MOLODETS","INCREMENT"],
    passed:["Amethyst","Flamewall","Slaughterhouse","Oblivion","Slaughterhouse Rebirth","Silent World","Kioker Per Ker","Neon Horizon"], // пройшли чужі рівні
    pts:0
  },
  "GGsBoy": {
    created:["NEURAL COLLAPSE"],
    verified:["Amethyst","VOID ASCENSION","Kioker Per Ker"],
    passed:["Spectral Core","Xeuweu","Tidal Wave","Kioker Per Ker","Query"],
    pts:0
  },
  "Xeuweu": {
    created:["Xeuweu","VOID ASCENSION","Void Spiral"],
    verified:["Xeuweu","NEURAL COLLAPSE"],
    passed:["Amethyst","Oblivion","VOID ASCENSION","Nullscape"],
    pts:0
  },
  "MeowCatMurcyk": {
    created:["Cat Molodets","CXT MOLODETS"],
    verified:[],
    passed:["Flamewall","NEURAL COLLAPSE"],
    pts:0
  },
  "Lonid": {
    created:["Neon Horizon"],
    verified:["Neon Horizon","SILENT HORIZON X","Silent World","Silest World"],
    passed:["Amethyst","Flamewall"],
    pts:0
      },
  "Zoink": {
    created:[],
    verified:["Slaughterhouse Rebirth","Avernus","Slaughterhouse","Nullscape"],
    passed:["Amethyst","Flamewall","Thinking Space II","Acheron","Cat Molodets","Silent World","CXT MOLODETS","Kioker Per Ker"],
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
    passed:["SILENT HORIZON X","Slaughterhouse","Xeuweu","Tidal Wave"],
    pts:0
             },
  "bkold": {
    created:[],
    verified:["andromeda"],
    passed:["Tidal Wave","Slaughterhouse Rebirth","Avernus","VOID ASCENSION","Cat Molodets","SILENT HORIZON X","Thinking Space II"],
    pts:0
               },
  "Hopii": {
    created:[],
    verified:["Query","Liptogen"],
    passed:["Tidal Wave","Cat Molodets"],
    pts:0
                  },
  "Trick": {
    created:[],
    verified:["Oblivion"],
    passed:["Tidal Wave","Amethyst","Slaughterhouse"],
    pts:0
  },
  "ItsHybrid": {
    created:[],
    verified:["Flamewall"],
    passed:["Tidal Wave","Spectral Core"],
    pts:0
      },
  "Knobbelboy": {
    created:[],
    verified:["Thinking Space II","Qwilt"],
    passed:["Silent World"],
    pts:0
        },
  "Fled": {
    created:[],
    verified:["Boobawamba"],
    passed:[],
    pts:0
       },
  "WhizKid": {
    created:[],
    verified:["Anathema"],
    passed:["Thinking Space II","Amethyst","Black Sun Zenith"],
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
      const levelBadges = renderBadges(getLevelBadges(l));
      d.innerHTML=`
        <img class="avatar" src="${l.avatar || ""}" alt="${l.name}" onerror="this.style.display='none'">
        <div>
          <div class="level-rank">#${l.rank} ${l.name}</div>
          <div class="level-meta">Автор: ${l.author} • Verifier: ${l.verifier}</div>
          ${levelBadges ? `<div class="badge-row">${levelBadges}</div>` : ""}
        </div>
        <div class="level-meta">${pointsForRank(l.rank)} pts</div>
      `;
      d.onclick = ()=>showLevelModal(l);
      levelsDiv.appendChild(d);
    });
}

// ====== РЕНДЕР ГРАВЦІВ ======
const playersDiv=document.getElementById("players");

function renderPlayers(){
  playersDiv.innerHTML = "";
  Object.entries(players)
    .sort((a,b)=>b[1].pts - a[1].pts)
    .forEach(([name,data],i)=>{
      const d=document.createElement("div");
      const hardest = getHardestPassedLevel(data);
      const playerBadges = renderBadges(getPlayerBadges(name, data));
      d.className="player";
      d.innerHTML=`
        <div>
          <b>#${i+1} ${name}</b>
          <div class="player-meta">Найважчий: ${hardest ? `#${hardest.rank} ${hardest.name}` : "Немає"}</div>
          ${playerBadges ? `<div class="badge-row">${playerBadges}</div>` : ""}
        </div>
        <span class="player-points">${data.pts} pts</span>
      `;
      d.onclick = ()=>showPlayerModal(name);
      playersDiv.appendChild(d);
    });
}

// ====== МОДАЛКИ ======
const modal = document.getElementById("modal");
const modalContent = document.querySelector(".modal-content");

function openModal(html){
  modal.style.display="flex";
  document.getElementById("modalBody").innerHTML=html;
}

modal.addEventListener("click", ()=>{ modal.style.display="none"; });
modalContent.addEventListener("click", e => e.stopPropagation());

function showLevelModal(level){
  const levelBadges = renderBadges(getLevelBadges(level));
  const passers = getLevelPassers(level.name);
  const html = `
    ${level.avatar ? `<img class="avatar-large" src="${level.avatar}" alt="${level.name}">` : ""}
    <h3>${level.name}</h3>
    ${levelBadges ? `<div class="badge-row">${levelBadges}</div>` : ""}
    <div class="info-block">
      <b>Автор:</b> <span>${level.author}</span><br>
      <b>Verifier:</b> <span>${level.verifier}</span><br>
      <b>Тип:</b> <span>${level.type}</span><br>
      <b>Очки:</b> <span>${pointsForRank(level.rank)}</span><br>
      <b>Тривалість:</b> <span>${level.time}</span>
    </div>
    <div class="info-block">
      <b>Пройшли рівень:</b>
      <div class="tag-list">${passers.length ? passers.map(p => `<div class="tag">${p}</div>`).join("") : '<div class="tag">Немає даних</div>'}</div>
    </div>
  `;
  openModal(html);
}

function showPlayerModal(playerName){
  const data = players[playerName];
  const hardest = getHardestPassedLevel(data);
  const playerBadges = renderBadges(getPlayerBadges(playerName, data));
  const html = `
    <h3>${playerName}</h3>
    ${playerBadges ? `<div class="badge-row">${playerBadges}</div>` : ""}
    <div class="info-block">
      <b>Найважчий рівень:</b> <span>${hardest ? `#${hardest.rank} ${hardest.name}` : "Немає"}</span>
    </div>
    <div class="info-block">
      <b>Зробив:</b>
      <div class="tag-list">${data.created.length ? data.created.map(l=>`<div class="tag">${l}</div>`).join("") : '<div class="tag">Немає</div>'}</div>
    </div>
    <div class="info-block">
      <b>Verifнув:</b>
      <div class="tag-list">${data.verified.length ? data.verified.map(l=>`<div class="tag">${l}</div>`).join("") : '<div class="tag">Немає</div>'}</div>
    </div>
    <div class="info-block">
      <b>Пройшов:</b>
      <div class="tag-list">${data.passed.length ? data.passed.map(l=>`<div class="tag">${l}</div>`).join("") : '<div class="tag">Немає</div>'}</div>
    </div>
    <div class="info-block">
      <b>Загальні очки:</b> <span>${data.pts}</span>
    </div>
  `;
  openModal(html);
}

// ====== ІНІЦІАЛІЗАЦІЯ ======
removeDuplicateUIBlocks();
renderLevels();
renderPlayers();
