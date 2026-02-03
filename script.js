document.addEventListener("DOMContentLoaded", function() {
  const levels = [
    {rank:1, name:"Tidal Wave", author:"OniLink", diff:"Extreme", verifier:"Ryamu", type:"real"},
    {rank:2, name:"Acheron", author:"Ryamu", diff:"Extreme", verifier:"OniLink", type:"real"},
    {rank:3, name:"Amethyst", author:"Endevvor", diff:"Extreme", verifier:"GGsBoy", type:"real"},
    {rank:4, name:"VOID ASCENSION", author:"Xeuweu", diff:"Impossible+", verifier:"Vityapro12", type:"fake"},
    {rank:5, name:"SILENT HORIZON X", author:"MythDev", diff:"Impossible", verifier:"Vityapro12", type:"fake"},
    {rank:6, name:"Slaughterhouse", author:"icedcave", diff:"Extreme", verifier:"Bo", type:"real"},
    {rank:7, name:"Thinking Space II", author:"Viprin", diff:"Extreme", verifier:"Vityapro12", type:"real"},
    {rank:8, name:"Flamewall", author:"Bianox", diff:"Extreme", verifier:"ItsHybrid", type:"real"},
    {rank:9, name:"Joke Level", author:"Memeguy", diff:"Extreme+", verifier:"Green", type:"fake"},
    {rank:10, name:"Avernus", author:"Bo", diff:"Extreme", verifier:"Diamond", type:"real"},
    {rank:11, name:"Liptogen", author:"MasterCreaster", diff:"Impossible", verifier:"Hopii", type:"fake"},
    {rank:12, name:"Shardscapes", author:"Diamond", diff:"Extreme", verifier:"Bo", type:"real"},
    {rank:13, name:"Void Spiral", author:"Xeuweu", diff:"Extreme+", verifier:"Vityapro12", type:"fake"},
    {rank:14, name:"Cat Molodets", author:"MeowCatMurcyk", diff:"Extreme", verifier:"Vityapro12", type:"fake"},
    {rank:15, name:"NEURAL COLLAPSE", author:"GGsBoy", diff:"Extreme+", verifier:"Xeuweu", type:"fake"}, // повернено
    {rank:16, name:"Spectral Core", author:"Xapped", diff:"Extreme+", verifier:"Vityapro12", type:"fake"}, // повернено
    {rank:17, name:"Quantum Fracture", author:"Xeuweu", diff:"Impossible", verifier:"GGsBoy", type:"real"},
    {rank:18, name:"Oblivion", author:"Bianox", diff:"Extreme+", verifier:"ItsHybrid", type:"real"},
    {rank:19, name:"Black Sun Zenith", author:"MythDev", diff:"Impossible", verifier:"Rob", type:"fake"},
    {rank:20, name:"Eclipse Protocol", author:"Xapped", diff:"Extreme+", verifier:"GGsBoy", type:"fake"},
    {rank:21, name:"Neon Horizon", author:"MythDev", diff:"Extreme+", verifier:"Lonid", type:"fake"}
  ];

  const list = document.getElementById("list");
  const history = document.getElementById("history");

  function render(filter) {
    list.innerHTML = "";
    levels
      .filter(l => filter === "all" || l.type === filter)
      .forEach(l => {
        const div = document.createElement("div");
        div.className = `level ${l.type}`;
        div.innerHTML = `
          <span class="rank">#${l.rank}</span>
          <span>${l.name}</span>
          <span>${l.author}</span>
          <span class="difficulty">${l.diff}</span>
          <span class="verifier">${l.verifier}</span>
        `;
        list.appendChild(div);
      });
  }

  window.filterLevels = render;

  render("all");

  window.showHistory = function() {
    if(history.style.display === "none") {
      history.style.display = "block";
    } else {
      history.style.display = "none";
    }
  };
});

function pointsForRank(rank){
  if(rank===1) return 350;
  if(rank===2) return 325;
  if(rank===3) return 300;
  if(rank===4) return 285;
  if(rank===5) return 270;
  if(rank===6) return 260;
  if(rank===7) return 250;
  if(rank===8) return 245;
  return Math.max(50, 245 - (rank-8)*5);
}

const players = {};

levels.forEach(l=>{
  // creator
  if(!players[l.author]){
    players[l.author]={country:"Unknown Realm",beaten:[],verified:[],created:[]};
  }
  players[l.author].created.push(l.name);

  // verifier
  if(!players[l.verifier]){
    players[l.verifier]={country:"Unknown Realm",beaten:[],verified:[],created:[]};
  }
  players[l.verifier].verified.push(l.name);
});

players["Vityapro12"].beaten.push("Void Spiral","Cat Molodets");
players["GGsBoy"].beaten.push("Amethyst");


const levels = [
  {rank:3,name:"Amethyst",author:"Endevvor",verifier:"GGsBoy",time:"1:42"},
  {rank:13,name:"Void Spiral",author:"Xeuweu",verifier:"Vityapro12",time:"2:05"},
  {rank:14,name:"Cat Molodets",author:"MeowCatMurcyk",verifier:"Vityapro12",time:"1:20"},
  {rank:15,name:"NEURAL COLLAPSE",author:"GGsBoy",verifier:"Xeuweu",time:"2:30"},
];

function avatar(text){
  const color = Math.floor(Math.random()*16777215).toString(16);
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
    <rect width="40" height="40" rx="8" fill="#${color}"/>
    <text x="20" y="26" font-size="16" fill="white" text-anchor="middle" font-family="Arial">
      ${text[0]}
    </text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}


const list = document.getElementById("list");
levels.forEach(l=>{
  const div=document.createElement("div");
  div.className="level";
  div.innerHTML=`
    <img class="avatar" src="${avatar(l.name)}">
    #${l.rank} ${l.name}
  `;
  div.onclick=()=>openModal(`
    <h3>${l.name}</h3>
    ⏱ Тривалість: ${l.time}<br>
    🧠 Очки: ${pointsForRank(l.rank)}<br>
    👤 Creator: ${l.author}<br>
    ✅ Verifier: ${l.verifier}
  `);
  list.appendChild(div);
});

const playersDiv=document.getElementById("players");
playersDiv.innerHTML="";

Object.keys(players).forEach(p=>{
  let pts=0;
  players[p].beaten.forEach(b=>{
    const lvl=levels.find(l=>l.name===b);
    if(lvl) pts+=pointsForRank(lvl.rank);
  });

  const div=document.createElement("div");
  div.className="player";
  div.innerHTML=`👤 ${p} — <b>${pts}</b> pts`;
  div.onclick=()=>openModal(`
    <h3>${p}</h3>
    🌍 Країна: ${players[p].country}<br><br>
    🏆 Пройшов: ${players[p].beaten.join(", ") || "—"}<br>
    ✅ Verifнув: ${players[p].verified.join(", ") || "—"}<br>
    🛠 Створив: ${players[p].created.join(", ") || "—"}
  `);
  playersDiv.appendChild(div);
});


function openModal(html){
  document.getElementById("modal").style.display="flex";
  document.getElementById("modalBody").innerHTML=html;
}
function closeModal(){
  document.getElementById("modal").style.display="none";
}

