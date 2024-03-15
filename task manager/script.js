document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('taskList');
    
    // Load tasks from local storage on page load
    loadTasks();

    // Add task button click event
    document.querySelector('#addTaskBtn').addEventListener('click', function () {
        addTask();
    });

    // Add task function
    function addTask() {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-card');

        const taskId = Date.now();
        taskItem.dataset.id = taskId;

        taskItem.innerHTML = `
            <input type="text" class="task-title" placeholder="Enter task title" required>
            <input type="date" class="task-dueDate" required>
            <select class="task-priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <select class="task-category">
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="others">Others</option>
            </select>
            <button class="complete-btn">Complete</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
            <p class="completion-message"></p>
        `;

        taskList.appendChild(taskItem);
        saveTasksToLocalStorage(); // Save tasks to local storage
        // Add event listeners for task completion, editing, and deletion
        const completeBtn = taskItem.querySelector('.complete-btn');
        const editBtn = taskItem.querySelector('.edit-btn');
        const deleteBtn = taskItem.querySelector('.delete-btn');

        completeBtn.addEventListener('click', function () {
            markTaskAsComplete(taskItem);
            saveTasksToLocalStorage(); // Save tasks to local storage after marking as complete
        });

        editBtn.addEventListener('click', function () {
            editTask(taskItem);
        });

        deleteBtn.addEventListener('click', function () {
            deleteTask(taskId);
            taskItem.remove(); // Remove task from the DOM
            saveTasksToLocalStorage(); // Save tasks to local storage after deletion
        });
    }

    // Mark task as complete
    function markTaskAsComplete(taskItem) {
        const completeBtn = taskItem.querySelector('.complete-btn');
        const completionMessage = taskItem.querySelector('.completion-message');

        if (completeBtn.classList.contains('completed')) {
            completeBtn.classList.remove('completed');
            completionMessage.textContent = '';
        } else {
            completeBtn.classList.add('completed');
            completionMessage.textContent = 'You are doing well, keep going :)';
        }
    }

    // Edit task
    function editTask(taskItem) {
        const titleInput = taskItem.querySelector('.task-title');
        const dueDateInput = taskItem.querySelector('.task-dueDate');
        const prioritySelect = taskItem.querySelector('.task-priority');
        const categorySelect = taskItem.querySelector('.task-category');

        titleInput.disabled = false;
        dueDateInput.disabled = false;
        prioritySelect.disabled = false;
        categorySelect.disabled = false;
    }

    // Delete task
    function deleteTask(taskId) {
        const taskItem = document.querySelector(`[data-id="${taskId}"]`);
        if (taskItem) {
            taskItem.remove();
        }
    }

    // Save tasks to local storage
    function saveTasksToLocalStorage() {
        const tasks = taskList.innerHTML;
        localStorage.setItem('tasks', tasks);
    }

    // Load tasks from local storage
    function loadTasks() {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            taskList.innerHTML = tasks;
        }
    }

    // Right-click event listener for deleting task
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        if (e.target.classList.contains('task-card')) {
            const taskId = e.target.dataset.id;
            deleteTask(taskId);
            saveTasksToLocalStorage(); // Save tasks to local storage after deletion
        }
    });
});
