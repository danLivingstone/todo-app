import uuidv4 from 'uuid/v4';
// Setup the empty todos array
let todos = [];

// Fetch existing todos from localStorage
const loadTodos = () => {
  // retrieve data from localStorage
  const todosJSON = localStorage.getItem('todos');
  // if there is data found, parse it into an object and add it to the todos array

  try {
    todos = todosJSON ? JSON.parse(todosJSON) : [];
  } catch (exception) {
    todos = [];
  }
};

// Save todos to localStorage
const saveTodos = () => {
  // Set localStorage to save the users new todo
  localStorage.setItem('todos', JSON.stringify(todos));
};

// Todos accessor
const getTodos = () => todos;

// Create a todo
const createTodo = (text) => {
  // push new todo object to the todos array
  todos.push({
    id: uuidv4(),
    text: text,
    completed: false
  });
  saveTodos();
};

// Remove a todo
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
    saveTodos();
  }
};

// Toggle the completed value for a given todo
const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
  }
};

// Populate todos array
loadTodos();

export { loadTodos, getTodos, createTodo, removeTodo, toggleTodo };
