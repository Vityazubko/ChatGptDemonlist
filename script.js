document.addEventListener("DOMContentLoaded", function() {
  const levels = [
    {rank:1, name:"Tidal Wave", author:"OniLink", diff:"Extreme", verifier:"Ryamu", type:"real"},
    {rank:2, name:"Acheron", author:"Ryamu", diff:"Extreme", verifier:"OniLink", type:"real"},
    {rank:3, name:"VOID ASCENSION", author:"Xeuweu", diff:"Impossible+", verifier:"Vityapro12", type:"fake"},
    {rank:4, name:"Avernus", author:"Bo", diff:"Extreme", verifier:"Diamond", type:"real"},
    {rank:5, name:"SILENT HORIZON X", author:"MythDev", diff:"Impossible", verifier:"Vityapro12", type:"fake"},
    {rank:6, name:"Slaughterhouse", author:"icedcave", diff:"Extreme", verifier:"Bo", type:"real"},
    {rank:7, name:"Thinking Space II", author:"Viprin", diff:"Extreme", verifier:"Vityapro12", type:"real"},
    {rank:8, name:"Spectral Core", author:"Xapped", diff:"Extreme+", verifier:"Vityapro12", type:"fake"},
    {rank:9, name:"Amethyst", author:"Endevvor", diff:"Extreme", verifier:"GGsBoy", type:"real"},
    {rank:10, name:"Flamewall", author:"Bianox", diff:"Extreme", verifier:"ItsHybrid", type:"real"},
    {rank:11, name:"NEURAL COLLAPSE", author:"GGsBoy", diff:"Extreme+", verifier:"Xeuweu", type:"fake"},
    
    // Нові рівні Pointercrate
    {rank:12, name:"Solar Flare", author:"Viprin", diff:"Extreme+", verifier:"Ryamu", type:"real"},
    {rank:13, name:"Shardscapes", author:"Diamond", diff:"Extreme", verifier:"Bo", type:"real"},
    {rank:14, name:"Quantum Fracture", author:"Xeuweu", diff:"Impossible", verifier:"GGsBoy", type:"real"},
    {rank:15, name:"Oblivion", author:"Bianox", diff:"Extreme+", verifier:"ItsHybrid", type:"real"},
    
    // Нові вигадані рівні
    {rank:16, name:"Black Sun Zenith", author:"MythDev", diff:"Impossible", verifier:"Vityapro12", type:"fake"},
    {rank:17, name:"Eclipse Protocol", author:"Xapped", diff:"Extreme+", verifier:"Vityapro12", type:"fake"},
    {rank:18, name:"Void Spiral", author:"Xeuweu", diff:"Extreme+", verifier:"Vityapro12", type:"fake"},
    {rank:19, name:"Cat Molodets", author:"MeowCatMurcyk", diff:"Extreme", verifier:"Vityapro12", type:"fake"},
    {rank:20, name:"Neon Horizon", author:"MythDev", diff:"Extreme+", verifier:"Vityapro12", type:"fake"}
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

