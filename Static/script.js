// script.js

// Function to confirm task deletion
function confirmDelete(taskId) {
    if (confirm("Are you sure you want to delete this task?")) {
        window.location.href = "/delete_task/" + taskId;
    }
}

// Function to confirm task completion
function completeTask(taskId) {
    if (confirm("Mark this task as completed?")) {
        window.location.href = "/complete_task/" + taskId;
    }
}
