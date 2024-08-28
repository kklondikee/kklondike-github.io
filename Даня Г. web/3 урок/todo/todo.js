document.addEventListener('DOMContentLoaded', function () {
    const addTaskBtn = document.getElementById('add-task-btn');
    const tasksContainer = document.querySelector('.tasks');
    const taskCount = document.getElementById('task-count');
    const editModal = document.getElementById('edit-modal');
    const closeModal = document.querySelector('.close');
    const saveEditBtn = document.getElementById('save-edit-btn');
    const editTaskInput = document.getElementById('edit-task-input');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentEditIndex = null;

    // Функция отображения задач
    function renderTasks() {
        tasksContainer.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.innerHTML = `
                <span>${task}</span>
                <div>
                    <button class="edit-btn" data-index="${index}">Редактировать</button>
                    <button class="delete-btn" data-index="${index}">Удалить</button>
                </div>
            `;
            tasksContainer.appendChild(taskElement);
        });
        taskCount.textContent = tasks.length;
    }

    // Функция добавления новой задачи
    function addTask(task) {
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Функция удаления задачи
    function removeTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Функция редактирования задачи
    function editTask(index, newTask) {
        tasks[index] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Обработчик для добавления новой задачи
    addTaskBtn.addEventListener('click', () => {
        const task = prompt('Введите новое задание:');

        if (task && task.trim()) { // Проверка, что задача не пустая
            addTask(task.trim());
        } else {
            alert('Задание не может быть пустым!');
        }
    });

    // Обработчик для нажатия на кнопки редактирования и удаления
    tasksContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.dataset.index;
            removeTask(index);
        } else if (event.target.classList.contains('edit-btn')) {
            currentEditIndex = event.target.dataset.index;
            editTaskInput.value = tasks[currentEditIndex];
            editModal.style.display = 'block';
        }
    });

    // Обработчик закрытия модального окна
    closeModal.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Обработчик для сохранения изменений в задаче
    saveEditBtn.addEventListener('click', () => {
        const newTask = editTaskInput.value;

        if (newTask && newTask.trim()) { // Проверка, что задача не пустая
            editTask(currentEditIndex, newTask.trim());
            editModal.style.display = 'none';
        } else {
            alert('Задание не может быть пустым!');
        }
    });

    // Первоначальная отрисовка задач
    renderTasks();
});
