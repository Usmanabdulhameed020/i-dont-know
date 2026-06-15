const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo) => {
        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.textContent = todo.text;
        span.classList.add('todo-text');

        li.appendChild(span);
        todoList.appendChild(li);
    });
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

addBtn.onclick = addTodo;

todoInput.onkeypress = (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
};

renderTodos();
