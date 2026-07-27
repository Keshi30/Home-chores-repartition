let data = loadData();
const profilesGrid = document.getElementById("profilesGrid");
const rewardList = document.getElementById("rewardList");

function renderProfiles() {
  profilesGrid.innerHTML = data.people.map((person, index) => {
    const next = data.rewards.find(r => person.points < r.points);
    return `
      <article class="profile">
        <header>
          <div>
            <div class="avatar" style="background:${person.color}">${person.avatar}</div>
            <h3>${person.name || "Sans nom"}</h3>
            <span class="badge">${person.role}</span>
          </div>
          <div class="points">${person.points}</div>
        </header>
        <div class="mini">${next ? `Prochaine récompense : ${next.title} à ${next.points} points.` : "Toutes les récompenses atteintes."}</div>
        <div class="profile-actions">
          <button class="btn s" data-plus="${index}">+1 point</button>
          <button class="btn s" data-reset="${index}">0</button>
        </div>
      </article>
    `;
  }).join("");

  rewardList.innerHTML = data.rewards.map(r => `<p>${r.title} — <strong>${r.points} points</strong></p>`).join("");
}

renderProfiles();
setupThemeToggle();

document.addEventListener("click", e => {
  const plus = e.target.closest("[data-plus]");
  const reset = e.target.closest("[data-reset]");

  if (plus) {
    data.people[Number(plus.dataset.plus)].points += 1;
    saveData(data);
    renderProfiles();
  }

  if (reset) {
    data.people[Number(reset.dataset.reset)].points = 0;
    saveData(data);
    renderProfiles();
  }
});

window.renderProfiles = renderProfiles;
