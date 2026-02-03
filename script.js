// ===== ПЕРЕМИКАННЯ =====
function showLevels(){
  document.getElementById("levelsSection").style.display="block";
  document.getElementById("playersSection").style.display="none";
}
function showPlayers(){
  document.getElementById("levelsSection").style.display="none";
  document.getElementById("playersSection").style.display="block";
}

// ===== ОЧКИ =====
function pointsForRank(r){
  if(r===1) return 350;
  if(r===2) return 325;
  if(r===3) return 300;
  if(r===4) return 285;
  if(r===5) return 270;
  if(r===6) return 260;
  if(r===7) return 250;
  if(r===8) return 245;
  return Math.max(50, 245-(r-8)*5);
}

// ===== АВАТАРКА =====
function avatar(text){
  const color = Math.floor(Math.random()*16777215).toString(16);
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
    <rect width="40" height="40" rx="8" fill="#${color}"/>
    <text x="20" y="26" font-size="16" fill="white" text-anchor="middle">${text[0]}</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

// ===== РІВНІ =====
const levels = [
  {rank:1,name:"Tidal Wave",author:"OniLink",verifier:"Ryamu",time:"2:10",avatar:},
  {rank:2,name:"Acheron",author:"Ryamu",verifier:"OniLink",time:"1:55"},
  {rank:3,name:"Amethyst",author:"Endevvor",verifier:"GGsBoy",time:"1:42"},
  {rank:4,name:"VOID ASCENSION",author:"Xeuweu",verifier:"Vityapro12",time:"1:42"},
  {rank:8,name:"Flamewall",author:"Bianox",verifier:"ItsHybrid",time:"1:50"},
  {rank:11,name:"Liptogen",author:"MasterCreaster",verifier:"Hopii",time:"2:05",avatar:},
  {rank:13,name:"Void Spiral",author:"Xeuweu",verifier:"Vityapro12",time:"2:00"},
  {rank:14,name:"Cat Molodets",author:"MeowCatMurcyk",verifier:"Vityapro12",time:"1:20",avatar:C:\Users\User\Downloads\Cat Molodets top 14.png},
  {rank:15,name:"NEURAL COLLAPSE",author:"GGsBoy",verifier:"Xeuweu",time:"2:30"},
  {rank:16,name:"Spectral Core",author:"Xapped",verifier:"Vityapro12",time:"2:15"}
];

// ===== РЕНДЕР РІВНІВ =====
const levelsDiv = document.getElementById("levels");
levels.forEach(l=>{
  const d=document.createElement("div");
  d.className="level";
  d.innerHTML=`
    <img class="avatar" src="${avatar(l.name)}">
    #${l.rank} ${l.name}
  `;
  d.onclick=()=>openModal(`
    <h3>${l.name}</h3>
    👤 Автор: ${l.author}<br>
    ✅ Verifier: ${l.verifier}<br>
    ⏱ Тривалість: ${l.time}<br>
    🧠 Очки: ${pointsForRank(l.rank)}
  `);
  levelsDiv.appendChild(d);
});

// ===== ГРАВЦІ (АВТО) =====
const players = {};
levels.forEach(l=>{
  if(!players[l.author]) players[l.author]={beaten:[],verified:[],created:[]};
  if(!players[l.verifier]) players[l.verifier]={beaten:[],verified:[],created:[]};
  players[l.author].created.push(l.name);
  players[l.verifier].verified.push(l.name);
});

// приклади проходжень
players["Vityapro12"].beaten=["Void Spiral","Cat Molodets"];
players["GGsBoy"].beaten=["Amethyst"];

// ===== РЕНДЕР ГРАВЦІВ =====
const playersDiv=document.getElementById("players");
Object.keys(players).forEach(p=>{
  let pts=0;
  players[p].beaten.forEach(b=>{
    const lvl=levels.find(l=>l.name===b);
    if(lvl) pts+=pointsForRank(lvl.rank);
  });
  const d=document.createElement("div");
  d.className="player";
  d.innerText=`${p} — ${pts} pts`;
  d.onclick=()=>openModal(`
    <h3>${p}</h3>
    🏆 Пройшов: ${players[p].beaten.join(", ")||"—"}<br>
    ✅ Verifнув: ${players[p].verified.join(", ")||"—"}<br>
    🛠 Створив: ${players[p].created.join(", ")||"—"}
  `);
  playersDiv.appendChild(d);
});

// ===== МОДАЛЬНЕ =====
function openModal(html){
  document.getElementById("modal").style.display="flex";
  document.getElementById("modalBody").innerHTML=html;
}
function closeModal(){
  document.getElementById("modal").style.display="none";
}
