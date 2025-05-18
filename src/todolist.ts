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

  //   set if problem for check the input
  if (!todoInput.value.trim()) {
    showError("Please enter your todo!");
    todoInput.focus();
    return;
  }

  // Creating an object that conforms to the Todo interface
  const todoObj: Todo = {
    id: crypto.randomUUID(),
    title: todoInput.value,
    isComplete: false,
  };

  // call function
  addTodoToDom(todoObj);
  todos.push(todoObj);
  setTodoInLocal();

  // input handler
  todoInput.value = "";
  todoInput.focus();
};

// create Alert message function
const showError = (message: string) => {
  const errorToast = document.querySelector(".error-toast") as HTMLDivElement;
  if (!errorToast) return;

  errorToast.textContent = message;
  errorToast.classList.add("show");

  setTimeout(() => {
    errorToast.classList.remove("show");
  }, 3000); // hides after 3 seconds
};

// create addTodoToDom function
const addTodoToDom = (todo: Todo) => {
  todoList.insertAdjacentHTML(
    "beforeend",
    ` <li>
          ${todo.title}<span class="icon"
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
  todos.forEach((todo) => addTodoToDom(todo));
});
