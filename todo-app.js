const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

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

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deleteTodo(index);

        li.appendChild(span);
        li.appendChild(deleteBtn);
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

addBtn.onclick = addTodo;

todoInput.onkeypress = (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
};

renderTodos();
