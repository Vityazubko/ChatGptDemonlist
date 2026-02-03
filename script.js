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

const VERIFY_POINTS = 40;

// ====== РІВНІ (ВСІ, НІЧОГО НЕ ВИДАЛЕНО) ======
const levels = [
  {rank:1,name:"Tidal Wave",author:"OniLink",verifier:"Ryamu",type:"pointer",time:"2:10",avatar:""},
  {rank:2,name:"Acheron",author:"Ryamu",verifier:"OniLink",type:"pointer",time:"1:55",avatar:""},
  {rank:3,name:"Amethyst",author:"Endevvor",verifier:"GGsBoy",type:"pointer",time:"1:42",avatar:""},
  {rank:8,name:"Flamewall",author:"Bianox",verifier:"ItsHybrid",type:"pointer",time:"1:50",avatar:""},
  {rank:11,name:"Liptogen",author:"MasterCreaster",verifier:"Hopii",type:"pointer",time:"2:05",avatar:""},
  {rank:13,name:"Void Spiral",author:"Xeuweu",verifier:"Vityapro12",type:"fan",time:"2:00",avatar:""},
  {rank:14,name:"Cat Molodets",author:"MeowCatMurcyk",verifier:"Vityapro12",type:"fan",time:"1:20",avatar:""},
  {rank:15,name:"NEURAL COLLAPSE",author:"GGsBoy",verifier:"Xeuweu",type:"fan",time:"2:30",avatar:""},
  {rank:16,name:"Spectral Core",author:"Xapped",verifier:"Vityapro12",type:"fan",time:"2:15",avatar:""},
  {rank:20,name:"Thinking Space II",author:"Atomic",verifier:"Knobbelboy",type:"pointer",time:"2:40",avatar:""},
  {rank:22,name:"Joke Level uh",author:"Memeguy",verifier:"Green",type:"pointer",time:"0:45",avatar:""},
  {rank:25,name:"Neon Horizon",author:"Lonid",verifier:"Lonid",type:"fan",time:"1:55",avatar:""},
  {rank:30,name:"Black Sun Zenith",author:"Rob",verifier:"Rob",type:"fan",time:"3:00",avatar:""}
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
        <img class="avatar" src="${l.avatar||''}">
        <div>
          <b>#${l.rank} ${l.name}</b><br>
          Автор: ${l.author} • Verifier: ${l.verifier}
        </div>
      `;
      d.onclick=()=>openModal(`
        <h3>${l.name}</h3>
        ⏱ ${l.time}<br>
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
const players={};

levels.forEach(l=>{
  if(!players[l.author]) players[l.author]={beaten:[],verified:[],pts:0};
  if(!players[l.verifier]) players[l.verifier]={beaten:[],verified:[],pts:0};
  players[l.author].beaten.push(l);
  players[l.verifier].verified.push(l);
});

// рахунок
Object.keys(players).forEach(p=>{
  players[p].beaten.forEach(l=>players[p].pts+=pointsForRank(l.rank));
  players[p].verified.forEach(()=>players[p].pts+=VERIFY_POINTS);
});

// ====== РЕНДЕР ГРАВЦІВ ======
const playersDiv=document.getElementById("players");

Object.entries(players)
  .sort((a,b)=>b[1].pts-a[1].pts)
  .forEach(([name,data])=>{
    const d=document.createElement("div");
    d.className="player";
    d.innerHTML=`<b>${name}</b> — ${data.pts} pts`;
    d.onclick=()=>openModal(`
      <h3>${name}</h3>
      🏆 Пройшов: ${data.beaten.map(l=>l.name).join(", ")||"—"}<br>
      ✅ Verifнув: ${data.verified.map(l=>l.name).join(", ")||"—"}
    `);
    playersDiv.appendChild(d);
  });

// ====== МОДАЛКА ======
function openModal(html){
  document.getElementById("modal").style.display="flex";
  document.getElementById("modalBody").innerHTML=html;
}
function closeModal(){
  document.getElementById("modal").style.display="none";
}
