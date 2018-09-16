import { getTodos, removeTodo, toggleTodo } from './todos';
import { getFilters } from './filters';

// function for filtering todos based on search criteria per keystroke
const renderTodos = () => {
  const todoElement = document.querySelector('#todos');
  const { searchText, hideCompleted } = getFilters();
  // create a filtered array based on users input
  const filteredTodos = getTodos().filter((todo) => {
    const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase());
    const hideCompletedMatch = !hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  // function for how many todos have not been completed
  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  // clear the todos list in the DOM
  todoElement.innerHTML = '';

  // display an h2 with how many todos the user has left to complete
  todoElement.appendChild(generateSummaryDOM(incompleteTodos));

  // display all the filtered todos to the DOM
  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todo) => {
      todoElement.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageElement = document.createElement('p');
    messageElement.classList.add('empty-message');
    messageElement.textContent = 'No to-dos to show';
    todoElement.appendChild(messageElement);
  }
};

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
  const todoElement = document.createElement('label');
  const containerElement = document.createElement('div');
  const checkbox = document.createElement('input');
  const todoText = document.createElement('span');
  const removeButton = document.createElement('button');

  // Setup todo checkbox
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = todo.completed;
  containerElement.appendChild(checkbox);
  checkbox.addEventListener('change', () => {
    toggleTodo(todo.id);
    renderTodos();
  });

  // Setup the todo text
  todoText.textContent = todo.text;
  containerElement.appendChild(todoText);

  // Setup container
  todoElement.classList.add('list-item');
  containerElement.classList.add('list-item__container');
  todoElement.appendChild(containerElement);

  // Setup the remove todo
  removeButton.textContent = 'Remove';
  removeButton.classList.add('button', 'button--text');
  todoElement.appendChild(removeButton);
  removeButton.addEventListener('click', () => {
    removeTodo(todo.id);
    renderTodos();
  });

  return todoElement;
};

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement('h2');
  const plural = incompleteTodos.length === 1 ? '' : 's';

  summary.classList.add('list-title');
  summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`;

  return summary;
};

// Make sure to set up the exports
export { renderTodos, generateTodoDOM, generateSummaryDOM };
