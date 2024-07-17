let tasks = [];

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskTitle = taskInput.value.trim();
    if (taskTitle) {
        const task = {
            id: Date.now().toString(),
            title: taskTitle,
            completed: false
        };
        tasks.push(task);
        taskInput.value = '';
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask('${task.id}')">
            <input type="text" value="${task.title}" onchange="editTask('${task.id}', this.value)">
            <button onclick="deleteTask('${task.id}')">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function toggleTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

function editTask(taskId, newTitle) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.title = newTitle;
        renderTasks();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}
