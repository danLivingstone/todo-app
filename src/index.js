import { renderTodos } from './views';
import { setFilters } from './filters';
import { loadTodos, createTodo } from './todos';

// Render initial todos
renderTodos();

// Listen for search text change and render the todo list
document.querySelector('#search-text').addEventListener('input', (event) => {
  setFilters({
    searchText: event.target.value
  });
  renderTodos();
});

// Hide completed checkbox toggle
document.querySelector('#hide-completed').addEventListener('change', (event) => {
  setFilters({
    hideCompleted: event.target.checked
  });
  renderTodos();
});

// add a new todo to the list of todos on submission
document.querySelector('#new-todo').addEventListener('submit', (event) => {
  const text = event.target.elements.text.value.trim();
  event.preventDefault();

  if (text.length > 0) {
    createTodo(text);
    renderTodos();
    event.target.elements.text.value = '';
  }
});

// Bonus: Add a watcher for local storage
window.addEventListener('storage', (event) => {
  if (event.key === 'todos') {
    loadTodos();
    renderTodos();
  }
});
