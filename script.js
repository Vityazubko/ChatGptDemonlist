// ================== JS версія 1.5.3 + нові дані ==================

// ======= Версія =======
let currentFilter = "all";
let currentView = "levels";
document.getElementById("version").innerText = "v1.5.3";

// ======= Очки =======
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

// ======= Список рівнів =======
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

// ======= Список гравців =======
const players = {
  "Vityapro12": {created:["Cat Molodets"], verified:["Void Spiral","Cat Molodets","Spectral Core","CXT MOLODETS","INCREMENT"], passed:["Amethyst","Flamewall","Slaughterhouse","Oblivion","Slaughterhouse Rebirth","Silent World","Kioker Per Ker","Neon Horizon"], pts:0},
  "GGsBoy": {created:["NEURAL COLLAPSE"], verified:["Amethyst","VOID ASCENSION","Kioker Per Ker"], passed:["Spectral Core","Xeuweu","Tidal Wave","Kioker Per Ker","Query"], pts:0},
  "Xeuweu": {created:["Xeuweu","VOID ASCENSION","Void Spiral"], verified:["Xeuweu","NEURAL COLLAPSE"], passed:["Amethyst","Oblivion","VOID ASCENSION","Nullscape"], pts:0},
  "MeowCatMurcyk": {created:["Cat Molodets","CXT MOLODETS"], verified:[], passed:["Flamewall","NEURAL COLLAPSE","Cat Molodets","CXT MOLODETS"], pts:0},
  "Lonid": {created:["Neon Horizon"], verified:["Neon Horizon","SILENT HORIZON X","Silent World","Silest World"], passed:["Amethyst","Flamewall"], pts:0},
  "Zoink": {created:[], verified:["Slaughterhouse Rebirth","Avernus","Slaughterhouse","Nullscape"], passed:["Amethyst","Flamewall","Thinking Space II","Acheron","Cat Molodets","Silent World","CXT MOLODETS","Kioker Per Ker"], pts:0},
  "Ryamu": {created:["Acheron"], verified:["Tidal Wave"], passed:["Query","Slaughterhouse Rebirth","Slaughterhouse"], pts:0},
  "OniLink": {created:["Tidal Wave"], verified:["Acheron"], passed:["SILENT HORIZON X","Slaughterhouse","Xeuweu","Tidal Wave"], pts:0},
  "bkold": {created:[], verified:["andromeda"], passed:["Tidal Wave","Slaughterhouse Rebirth","Avernus","VOID ASCENSION","Cat Molodets","SILENT HORIZON X","Thinking Space II"], pts:0},
  "Hopii": {created:[], verified:["Query","Liptogen"], passed:["Tidal Wave","Cat Molodets"], pts:0},
  "Trick": {created:[], verified:["Oblivion"], passed:["Tidal Wave","Amethyst","Slaughterhouse"], pts:0},
  "ItsHybrid": {created:[], verified:["Flamewall"], passed:["Tidal Wave","Spectral Core"], pts:0},
  "Knobbelboy": {created:[], verified:["Thinking Space II","Qwilt"], passed:["Silent World"], pts:0},
  "Fled": {created:[], verified:["Boobawamba"], passed:[], pts:0},
  "WhizKid": {created:[], verified:["Anathema"], passed:["Thinking Space II","Amethyst","Black Sun Zenith"], pts:0}
};

// ======= Перерахунок очок =======
function recalcPoints(){
    Object.values(players).forEach(p=>p.pts=0);
    levels.forEach(l=>{
        const base = pointsForRank(l.rank);
        Object.entries(players).forEach(([name,p])=>{
            if(p.passed.includes(l.name) && l.verifier!==name) p.pts += base;
            if(p.verified.includes(l.name)) p.pts += base*2;
        });
    });
}

// ======= Рендер рівнів =======
function renderLevels(){
    const box = document.getElementById("levelsView");
    box.innerHTML = "";
    levels
        .filter(l=>currentFilter==="all"||l.type===currentFilter)
        .sort((a,b)=>a.rank-b.rank)
        .forEach(l=>{
            const d = document.createElement("div");
            d.className="level";
            d.innerHTML = `
                <img class="avatar" src="${l.avatar||''}">
                <div>
                    <b>#${l.rank} ${l.name}</b> <span class="badge">${l.type}</span><br>
                    Автор: ${l.author} • Verifier: ${l.verifier}
                </div>
            `;
            d.onclick = ()=>showLevelModal(l);
            box.appendChild(d);
        });
}

// ======= Рендер гравців =======
function renderPlayers(){
    const box = document.getElementById("playersView");
    box.innerHTML = "";
    Object.entries(players)
        .sort((a,b)=>b[1].pts - a[1].pts)
        .forEach(([name,data],i)=>{
            const d = document.createElement("div");
            d.className="player";
            let badges="";
            if(data.created.length>0) badges+=`<span class="badge">Creator</span> `;
            if(data.verified.length>0) badges+=`<span class="badge">Verifier</span>`;
            d.innerHTML=`<b>#${i+1} ${name}</b> — ${data.pts} pts ${badges}`;
            d.onclick = ()=>showPlayerModal(name);
            box.appendChild(d);
        });
}

// ======= Модалки =======
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
function openModal(html){ modal.style.display="flex"; modalContent.innerHTML=html; }
function closeModal(){ modal.style.display="none"; }
modal.addEventListener("click",closeModal);
modalContent.addEventListener("click", e=>e.stopPropagation());

function showLevelModal(level){
    const passedBy = Object.entries(players)
        .filter(([_,p])=>p.passed.includes(level.name))
        .map(([n])=>n);
    const html = `
        <img class="avatar-large" src="${level.avatar||''}">
        <h3>${level.name}</h3>
        <div class="info-block">
            <b>Автор:</b> ${level.author}<br>
            <b>Verifier:</b> ${level.verifier}<br>
            <b>Тип:</b> ${level.type}<br>
            <b>Очки:</b> ${pointsForRank(level.rank)}<br>
            <b>Тривалість:</b> ${level.time}<br>
            <b>Пройшли цей рівень:</b> ${passedBy.join(", ")||"—"}
        </div>
    `;
    openModal(html);
}

function showPlayerModal(name){
    const p = players[name];
    const hardest = p.passed
        .map(lv => levels.find(l=>l.name===lv))
        .filter(Boolean)
        .sort((a,b)=>b.rank-a.rank)[0];
    const html = `
        <h3>${name}</h3>
        <div class="info-block">
            <b>Очки:</b> ${p.pts}<br>
            <b>Найважчий пройдений:</b> ${hardest?`#${hardest.rank} ${hardest.name}`:"—"}<br>
            <b>Створив:</b> ${p.created.join(", ")||"—"}<br>
            <b>Verifнув:</b> ${p.verified.join(", ")||"—"}<br>
            <b>Пройшов:</b> ${p.passed.join(", ")||"—"}<br>
        </div>
    `;
    openModal(html);
}

// ======= UI =======
function setView(view){
    currentView=view;
    document.getElementById("levelsView").style.display=view==="levels"?"block":"none";
    document.getElementById("playersView").style.display=view==="players"?"block":"none";
    document.getElementById("btnLevels").classList.toggle("active",view==="levels");
    document.getElementById("btnPlayers").classList.toggle("active",view==="players");
}

function toggleType(){
    if(currentFilter==="all") currentFilter="pointer";
    else if(currentFilter==="pointer") currentFilter="fan";
    else currentFilter="all";
    renderLevels();
}

// ======= Ініціалізація =======
recalcPoints();
renderLevels();
renderPlayers();
setView("levels");
