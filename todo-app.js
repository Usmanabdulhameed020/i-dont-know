const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Modal elements
const editModal = document.getElementById('edit-modal');
const editInput = document.getElementById('edit-input');
const saveEditBtn = document.getElementById('save-edit-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentlyEditingIndex = null;

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.textContent = todo.text;
        span.classList.add('todo-text');

        const btnContainer = document.createElement('div');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.onclick = () => openEditModal(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deleteTodo(index);

        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);
        
        li.appendChild(span);
        li.appendChild(btnContainer);
        todoList.appendChild(li);
    });
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text });
        todoInput.value = '';
        saveTodos();
        renderTodos();
    }
}

// Modal Functions
function openEditModal(index) {
    currentlyEditingIndex = index;
    editInput.value = todos[index].text;
    editModal.style.display = 'flex';
    editInput.focus();
}

function closeEditModal() {
    editModal.style.display = 'none';
    currentlyEditingIndex = null;
    editInput.value = '';
}

function saveEdit() {
    const newText = editInput.value.trim();
    if (newText && currentlyEditingIndex !== null) {
        todos[currentlyEditingIndex].text = newText;
        saveTodos();
        renderTodos();
        closeEditModal();
    }
}

addBtn.onclick = addTodo;

todoInput.onkeypress = (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
};

saveEditBtn.onclick = saveEdit;
cancelEditBtn.onclick = closeEditModal;

editInput.onkeypress = (e) => {
    if (e.key === 'Enter') {
        saveEdit();
    }
};

// Close modal when clicking outside
window.onclick = (event) => {
    if (event.target === editModal) {
        closeEditModal();
    }
};

renderTodos();
