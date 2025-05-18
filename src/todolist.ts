// get elements from index.html
const $ = document;
const todoInput = $.querySelector(".todo-value") as HTMLInputElement;
const addTodo = $.querySelector(".add-todo") as HTMLButtonElement;
const clearAllTodo = $.querySelector(".clear-todos") as HTMLButtonElement;
const removeTodo = $.querySelector(".icon") as HTMLButtonElement;
const todoList = $.querySelector(".todoList") as HTMLUListElement;

// create interface
interface Todo {
  id: string;
  title: string;
  isComplete: boolean;
}

// create todos array and ....
const todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

// create add new todo Function
const addNewTodo = (event: Event) => {
  // set preventDefault method
  event.preventDefault();

  // Creating an object that conforms to the Todo interface
  const todoObj: Todo = {
    id: crypto.randomUUID(),
    title: todoInput.value,
    isComplete: false,
  };

  // call addTodoToDom function
  addTodoToDom(todoObj);

  // input handler
  todoInput.value = "";
  todoInput.focus();
};

// create addTodoToDom function
const addTodoToDom = (todo: Todo) => {
  todoList.insertAdjacentHTML(
    "beforeend",
    ` <li>
          ${todo.title}<span class="icon" onclick="removeTodo('${todo.id}')"
            ><i class="fas fa-trash"></i
          ></span>
        </li>`
  );
};

// create set todo to local storage function
const setTodoInLocal = () => {
  // set todo at local storage
  localStorage.setItem("todos", JSON.stringify(todos));
};

// set add event listener
addTodo.addEventListener("click", (event) => addNewTodo(event));
window.addEventListener("DOMContentLoaded", () => {
    // set loop for render the item
    todos.forEach((todo) => addTodoToDom(todo))
});
