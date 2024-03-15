document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('taskList');
    
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
            <button class="complete-btn">Complete</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
            <p class="completion-message"></p>
        `;

        taskList.appendChild(taskItem);

        // Add event listeners for task completion, editing, and deletion
        const completeBtn = taskItem.querySelector('.complete-btn');
        const editBtn = taskItem.querySelector('.edit-btn');
        const deleteBtn = taskItem.querySelector('.delete-btn');

        completeBtn.addEventListener('click', function () {
            markTaskAsComplete(taskItem);
        });

        editBtn.addEventListener('click', function () {
            editTask(taskItem);
        });

        deleteBtn.addEventListener('click', function () {
            deleteTask(taskId);
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

        titleInput.disabled = false;
        dueDateInput.disabled = false;
        prioritySelect.disabled = false;
    }

    // Delete task
    function deleteTask(taskId) {
        const taskItem = document.querySelector(`[data-id="${taskId}"]`);
        if (taskItem) {
            taskItem.remove();
        }
    }

    // Right-click event listener for deleting task
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        if (e.target.classList.contains('task-card')) {
            const taskId = e.target.dataset.id;
            deleteTask(taskId);
        }
    });
});
