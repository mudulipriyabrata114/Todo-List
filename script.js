
let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    document.getElementById("totalTasks").textContent = tasks.length;

    document.getElementById("pendingTasks").textContent =
        tasks.filter(task => !task.completed).length;

    document.getElementById("completedTasks").textContent =
        tasks.filter(task => task.completed).length;

    document.getElementById("emptyMessage").style.display =
        tasks.length === 0 ? "block" : "none";

    tasks.forEach(task => {
        const item = document.createElement("div");

        item.className = "task-item" +
            (task.completed ? " done" : "");

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;

        const completeBtn = document.createElement("button");
        completeBtn.className = "complete-btn";
        completeBtn.textContent = task.completed ? "Undo" : "Done";

        completeBtn.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", () => {
            const newText = prompt("Edit your task:", task.text);

            if (newText !== null && newText.trim() !== "") {
                task.text = newText.trim();
                saveTasks();
                renderTasks();
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        item.append(text, completeBtn, editBtn, deleteBtn);
        taskList.appendChild(item);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: taskText,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        addTask();
    }
});

renderTasks();
