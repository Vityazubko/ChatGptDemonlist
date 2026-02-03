document.addEventListener("DOMContentLoaded", function() {
  const levels = [ /* всі рівні */ ];

  const list = document.getElementById("list");

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
        `;
        list.appendChild(div);
      });
  }

  function filterLevels(type) {
    render(type);
  }

  window.filterLevels = filterLevels;

  render("all");
});
