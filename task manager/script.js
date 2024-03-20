document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('taskList');
    const searchInput = document.getElementById('searchInput');
    const filterPriority = document.getElementById('filterPriority');

    // Load tasks from local storage on page load
    loadTasks();

    // Add task button click event
    document.querySelector('#addTaskBtn').addEventListener('click', function () {
        addTask();
    });

    // Search input event listener
    searchInput.addEventListener('input', function () {
        filterTasks();
    });

    // Filter priority select event listener
    filterPriority.addEventListener('change', function () {
        filterTasks();
    });

    // Add task function
    function addTask() {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-card', 'new-task'); //used for styling the new task
      
        //generates a unique identifier for the task using the current timestamp
        const taskId = Date.now();
        taskItem.dataset.id = taskId;

        taskItem.innerHTML = `
            <input type="text" class="task-title" placeholder="Enter task title">
            <div class="calendar-container">
                <label for="dueDate">Due Date:</label>
                <input type="date" id="dueDate" class="task-dueDate">
            </div>
            <div class="calendar-container">
                <label for="reminderDate">Reminder Date & Time:</label>
                <input type="date" id="reminderDate" class="task-reminderDate">
                <input type="time" class="task-reminderTime">
            </div>
            <select class="task-priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <select class="task-category">
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="others">Others</option>
            </select>
            <button class="complete-btn">Complete</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
            <button class="reminder-btn">Set Reminder</button>
            <button class="save-btn">Save</button>
            <p class="completion-message"></p>
        `;

        taskList.appendChild(taskItem);
        attachTaskListeners(taskItem);
    }

    // Attach event listeners for a task
    function attachTaskListeners(taskItem) {
        const completeBtn = taskItem.querySelector('.complete-btn');
        const editBtn = taskItem.querySelector('.edit-btn');
        const deleteBtn = taskItem.querySelector('.delete-btn');
        const reminderBtn = taskItem.querySelector('.reminder-btn');
        const saveBtn = taskItem.querySelector('.save-btn');

        completeBtn.addEventListener('click', function () {
            markTaskAsComplete(taskItem);
        });

        editBtn.addEventListener('click', function () {
            editTask(taskItem);
        });

        deleteBtn.addEventListener('click', function () {
            deleteTask(taskItem);
            taskItem.remove();
            saveTasksToLocalStorage();
        });

        reminderBtn.addEventListener('click', function () {
            setReminder(taskItem);
        });

        saveBtn.addEventListener('click', function () {
            saveTaskData(taskItem);
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
        const inputs = taskItem.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.disabled = !input.disabled;
        });
    }  
    // Delete task removes a task from the task manager application and its associated data from local storage.
    function deleteTask(taskItem) {
        const taskId = taskItem.dataset.id;
        // Remove task data from local storage
        localStorage.removeItem(`task_${taskId}`);
        // Remove task element from the UI
        
}



    // Save task data to local storage
    function saveTaskData(taskItem) {
        // Delete old version of task if it exists
        const taskId = taskItem.dataset.id;
        const existingTask = localStorage.getItem(`task_${taskId}`);
        if (existingTask) {
            localStorage.removeItem(`task_${taskId}`);
        }

        // Save edited task data to local storage
        const title = taskItem.querySelector('.task-title').value;
        const dueDate = taskItem.querySelector('.task-dueDate').value;
        const reminderDate = taskItem.querySelector('.task-reminderDate').value;
        const reminderTime = taskItem.querySelector('.task-reminderTime').value;
        const priority = taskItem.querySelector('.task-priority').value;
        const category = taskItem.querySelector('.task-category').value;

        const taskData = {
            title: title,
            dueDate: dueDate,
            reminderDate: reminderDate,
            reminderTime: reminderTime,
            priority: priority,
            category: category
        };

        localStorage.setItem(`task_${taskId}`, JSON.stringify(taskData));
    }

    // Load tasks from local storage
    function loadTasks() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('task_')) {
                const taskData = JSON.parse(localStorage.getItem(key));
                renderTask(taskData);
            }
        }
    }

    // Render task from data
    function renderTask(taskData) {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-card');

        taskItem.innerHTML = `
            <input type="text" class="task-title" value="${taskData.title}" disabled required>
            <div class="calendar-container">
                <label for="dueDate">Due Date:</label>
                <input type="date" id="dueDate" class="task-dueDate" value="${taskData.dueDate}" disabled required>
            </div>
            <div class="calendar-container">
                <label for="reminderDate">Reminder Date & Time:</label>
                <input type="date" id="reminderDate" class="task-reminderDate" value="${taskData.reminderDate}" disabled required>
                <input type="time" class="task-reminderTime" value="${taskData.reminderTime}" disabled required>
            </div>
            <select class="task-priority" disabled>
                <option value="low" ${taskData.priority === 'low' ? 'selected' : ''}>Low</option>
                <option value="medium" ${taskData.priority === 'medium' ? 'selected' : ''}>Medium</option>
                <option value="high" ${taskData.priority === 'high' ? 'selected' : ''}>High</option>
            </select>
            <select class="task-category" disabled>
                <option value="work" ${taskData.category === 'work' ? 'selected' : ''}>Work</option>
                <option value="personal" ${taskData.category === 'personal' ? 'selected' : ''}>Personal</option>
                <option value="shopping" ${taskData.category === 'shopping' ? 'selected' : ''}>Shopping</option>
                <option value="others" ${taskData.category === 'others' ? 'selected' : ''}>Others</option>
            </select>
            <button class="complete-btn">Complete</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
            <button class="reminder-btn">Set Reminder</button>
            <button class="save-btn">Save</button>
            <p class="completion-message"></p>
        `;

        taskList.appendChild(taskItem);
        attachTaskListeners(taskItem);
    }

    // Set reminder for the task
    function setReminder(taskItem) {
        const title = taskItem.querySelector('.task-title').value;
        const reminderDate = new Date(taskItem.querySelector('.task-reminderDate').value);
        const reminderTime = taskItem.querySelector('.task-reminderTime').value;

        // Set reminder date time
        const reminderDateTime = new Date(reminderDate.toDateString() + ' ' + reminderTime);

        // Check if the reminder time is in the past
        if (reminderDateTime < new Date()) {
            alert('Cannot set a reminder for past date/time.');
            return;
        }

        // Calculate the time difference between now and the reminder time
        const timeDifference = reminderDateTime - new Date();

        // Set up a timeout to display the reminder message at the specified time
        setTimeout(() => {
            const notification = document.createElement('div');
            notification.textContent = `HURRY UP! Task "${title}" Dute date is soon!`;
            notification.style.backgroundColor = '#007bff';
            notification.style.color = '#fff';
            notification.style.padding = '10px';
            notification.style.borderRadius = '5px';
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.zIndex = '9999';
            document.body.appendChild(notification);

            // Remove the notification after 5 seconds
            setTimeout(() => {
                notification.remove();
            }, 5000);
        }, timeDifference);
    }

    // Filter tasks based on search input and selected priority
    function filterTasks() {
        const searchText = searchInput.value.toLowerCase();
        const selectedPriority = filterPriority.value.toLowerCase();

        const tasks = taskList.querySelectorAll('.task-card');
        tasks.forEach(task => {
            const title = task.querySelector('.task-title').value.toLowerCase();
            const priority = task.querySelector('.task-priority').value.toLowerCase();
            if (title.includes(searchText) && (selectedPriority === 'all' || priority === selectedPriority)) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
    }
});
