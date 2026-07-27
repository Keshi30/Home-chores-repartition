let data = loadData();

const peopleGrid = document.getElementById("peopleGrid");
const dailyTasks = document.getElementById("dailyTasks");
const weeklyTasks = document.getElementById("weeklyTasks");
const results = document.getElementById("results");
const summaryList = document.getElementById("summaryList");

function renderPeople() {
  peopleGrid.innerHTML = data.people.map((person, index) => `
    <label class="person">
      <div class="avatar" style="background:${person.color}">${person.avatar}</div>
      <input value="${person.name}" data-person-name="${index}" placeholder="Nom">
      <select data-person-role="${index}">
        <option ${person.role === "Parent" ? "selected" : ""}>Parent</option>
        <option ${person.role === "Enfant" ? "selected" : ""}>Enfant</option>
        <option ${person.role === "Autre" ? "selected" : ""}>Autre</option>
      </select>
    </label>
  `).join("");
}

function taskCard(task) {
  return `
    <label class="task">
      <input type="checkbox" data-task-id="${task.id}" ${data.selectedTasks.includes(task.id) ? "checked" : ""}>
      <div>
        <strong>${task.icon} ${task.name}</strong>
        <span>${task.type === "daily" ? "Quotidienne" : "Hebdomadaire"} · ${task.points} pts</span>
        <button type="button" data-open="${task.id}">Voir le mode d’emploi</button>
      </div>
    </label>
  `;
}

function renderTasks() {
  dailyTasks.innerHTML = data.tasks.filter(t => t.type === "daily").map(taskCard).join("");
  weeklyTasks.innerHTML = data.tasks.filter(t => t.type === "weekly").map(taskCard).join("");
  updateCounts();
}

function updateCounts() {
  document.getElementById("selectedCount").textContent = data.selectedTasks.length;
  document.getElementById("peopleCount").textContent = data.people.filter(p => p.name.trim()).length;
  document.getElementById("lastDraw").textContent = data.lastDraw;
  document.getElementById("doneCount").textContent = data.completedKeys.length;
}

function renderResults() {
  if (!data.assignments.length) {
    results.innerHTML = `<div class="empty">Aucune répartition pour l’instant.</div>`;
    summaryList.innerHTML = "";
    updateCounts();
    return;
  }

  results.innerHTML = data.assignments.map((assignment, index) => {
    const key = `${assignment.taskId}__${assignment.personName}__${index}`;
    const done = data.completedKeys.includes(key);
    const task = taskById(data, assignment.taskId);
    return `
      <article class="assignment ${done ? "done" : ""}">
        <div>
          <small>${assignment.type === "daily" ? "Aujourd’hui" : "Cette semaine"}</small>
          <strong>${assignment.taskName}</strong>
          <div class="mini">${task.points} point${task.points > 1 ? "s" : ""}</div>
        </div>
        <div class="badge">${assignment.personName}</div>
        <button class="donebtn ${done ? "done" : ""}" data-done="${key}">${done ? "Terminée" : "Terminer + points"}</button>
      </article>
    `;
  }).join("");

  const grouped = {};
  data.assignments.forEach(item => {
    grouped[item.personName] = grouped[item.personName] || [];
    grouped[item.personName].push(item.taskName);
  });

  summaryList.innerHTML = Object.entries(grouped).map(([person, tasks]) => `
    <div class="step"><strong>${person}</strong> — ${tasks.length} tâche${tasks.length > 1 ? "s" : ""}: ${tasks.join(", ")}</div>
  `).join("");
  updateCounts();
}

function drawAssignments() {
  const activePeople = data.people.filter(p => p.name.trim()).map(p => p.name);
  const selected = data.tasks.filter(t => data.selectedTasks.includes(t.id));
  if (!activePeople.length || !selected.length) return;

  const shuffledPeople = shuffle(activePeople);
  data.assignments = shuffle(selected).map((task, index) => ({
    taskId: task.id,
    taskName: task.name,
    type: task.type,
    personName: shuffledPeople[index % shuffledPeople.length]
  }));

  data.completedKeys = [];
  data.lastDraw = new Date().toLocaleTimeString("fr-CA", { hour: "2-digit", minute: "2-digit" });
  saveData(data);
  renderResults();
}

function quickSelect() {
  data.selectedTasks = data.tasks.filter(t => t.type === "daily").slice(0, 5).map(t => t.id);
  saveData(data);
  renderTasks();
}

function clearAll() {
  data.selectedTasks = [];
  data.assignments = [];
  data.completedKeys = [];
  data.lastDraw = "—";
  saveData(data);
  renderTasks();
  renderResults();
}

function completeTask(key) {
  if (data.completedKeys.includes(key)) return;
  data.completedKeys.push(key);
  const [taskId, personName] = key.split("__");
  const task = taskById(data, taskId);
  const person = data.people.find(p => p.name === personName);
  if (task && person) person.points += task.points;
  saveData(data);
  renderResults();
  renderProfiles?.();
}

function addTask(event) {
  event.preventDefault();
  const name = document.getElementById("newTaskName").value.trim();
  const type = document.getElementById("newTaskType").value;
  const points = Number(document.getElementById("newTaskPoints").value || 0);
  const instructions = document.getElementById("newTaskInstructions").value
    .trim()
    .split("
")
    .map(line => line.trim())
    .filter(Boolean);

  if (!name) return;

  data.tasks.push({
    id: slugify(name),
    name,
    type,
    points,
    icon: "✨",
    instructions: instructions.length ? instructions : ["Étape 1 à compléter.", "Étape 2 à compléter."]
  });

  saveData(data);
  event.target.reset();
  document.getElementById("newTaskPoints").value = 1;
  renderTasks();
}

renderPeople();
renderTasks();
renderResults();
setupThemeToggle();

document.addEventListener("change", e => {
  const nameInput = e.target.closest("[data-person-name]");
  const roleInput = e.target.closest("[data-person-role]");
  const taskInput = e.target.closest("[data-task-id]");

  if (nameInput) {
    data.people[Number(nameInput.dataset.personName)].name = nameInput.value;
    saveData(data);
    updateCounts();
  }

  if (roleInput) {
    data.people[Number(roleInput.dataset.personRole)].role = roleInput.value;
    saveData(data);
  }

  if (taskInput) {
    const id = taskInput.dataset.taskId;
    if (taskInput.checked) {
      if (!data.selectedTasks.includes(id)) data.selectedTasks.push(id);
    } else {
      data.selectedTasks = data.selectedTasks.filter(t => t !== id);
    }
    saveData(data);
    updateCounts();
  }
});

document.addEventListener("click", e => {
  const open = e.target.closest("[data-open]");
  const done = e.target.closest("[data-done]");

  if (open) {
    location.href = `mode-emploi.html#${open.dataset.open}`;
  }

  if (done) {
    completeTask(done.dataset.done);
  }
});

document.getElementById("drawBtn").addEventListener("click", drawAssignments);
document.getElementById("quickBtn").addEventListener("click", quickSelect);
document.getElementById("clearBtn").addEventListener("click", clearAll);
document.getElementById("printBtn").addEventListener("click", () => window.print());
document.getElementById("taskForm").addEventListener("submit", addTask);
