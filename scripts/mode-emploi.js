let data = loadData();
const instructionList = document.getElementById("instructionList");
const search = document.getElementById("search");

function renderInstructions(filter = "") {
  const q = filter.trim().toLowerCase();
  const items = data.tasks.filter(t => t.name.toLowerCase().includes(q));

  instructionList.innerHTML = items.length ? items.map(task => `
    <article class="instruction" id="${task.id}">
      <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
        <h3>${task.icon} ${task.name}</h3>
        <span class="badge">${task.type === "daily" ? "Quotidienne" : "Hebdomadaire"} · ${task.points} pts</span>
      </div>
      <ol>
        ${task.instructions.map(step => `<li>${step}</li>`).join("")}
      </ol>
      <p class="mini"><a href="tirage.html">Retour au tirage</a></p>
    </article>
  `).join("") : `<div class="empty">Aucune tâche trouvée.</div>`;
}

renderInstructions();

if (location.hash) {
  const id = location.hash.replace("#", "");
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

search.addEventListener("input", e => renderInstructions(e.target.value));
setupThemeToggle();
