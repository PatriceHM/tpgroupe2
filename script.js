// Sélection des éléments HTML
const taskInput = document.getElementById("taskInput");
const taskTableBody = document.getElementById("taskTableBody");

// Charger les tâches depuis le LocalStorage
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Veuillez entrer une tâche !");
        return;
    }

    // Création d'un objet tâche
    const task = { text: taskText, completed: false };

    // Récupérer les tâches existantes dans le LocalStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Mettre à jour le tableau et vider l'input
    taskInput.value = "";
    loadTasks();
}
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskTableBody.innerHTML = ""; // Nettoyer le tableau

    tasks.forEach((task, index) => {
        const row = document.createElement("tr");

        // Colonne "Tâche"
        const taskCell = document.createElement("td");
        taskCell.textContent = task.text;
        row.appendChild(taskCell);

        // Colonne "Statut"
        const statusCell = document.createElement("td");
        statusCell.textContent = task.completed ? "✔ Terminée" : "❌ Non terminée";
        statusCell.classList.add(task.completed ? "completed" : "not-completed");
        row.appendChild(statusCell);

        // Colonne "Actions"
        const actionsCell = document.createElement("td");

        // Bouton "Marquer comme terminée"
        const completeBtn = document.createElement("button");
        completeBtn.textContent = " confirmer ✔";
        completeBtn.classList.add("action-btn", "complete-btn");
        completeBtn.addEventListener("click", () => toggleTask(index));
        actionsCell.appendChild(completeBtn);

  // Bouton "Supprimer"
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "supremer ❌";
  deleteBtn.classList.add("action-btn", "delete-btn");
  deleteBtn.addEventListener("click", () => deleteTask(index));
  actionsCell.appendChild(deleteBtn);

  row.appendChild(actionsCell);
  taskTableBody.appendChild(row);
});
}

function toggleTask(index) {
const tasks = JSON.parse(localStorage.getItem("tasks"));
tasks[index].completed = !tasks[index].completed;
localStorage.setItem("tasks", JSON.stringify(tasks));
loadTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

