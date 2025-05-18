// get elements from index.html
const $ = document;
const todoInput = $.querySelector(".todo-value");
const addTodo = $.querySelector(".add-todo");
const clearAllTodo = $.querySelector(".clear-todos");
const removeTodo = $.querySelector(".icon");
const todoList = $.querySelector(".todoList");
// create todos array and ....
const todos = JSON.parse(localStorage.getItem("todos") || "[]");
// create add new todo Function
const addNewTodo = (event) => {
    // set preventDefault method
    event.preventDefault();
    //   set if problem for check the input
    if (!todoInput.value.trim()) {
        showError("Please Enter Your Todo!");
        todoInput.focus();
        return;
    }
    // Creating an object that conforms to the Todo interface
    const todoObj = {
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
const showError = (message) => {
    const errorToast = document.querySelector(".error-toast");
    if (!errorToast)
        return;
    errorToast.textContent = message;
    errorToast.classList.add("show");
    setTimeout(() => {
        errorToast.classList.remove("show");
    }, 3000); // hides after 3 seconds
};
// create addTodoToDom function
const addTodoToDom = (todo) => {
    todoList.insertAdjacentHTML("beforeend", ` <li>
          ${todo.title}<span class="icon"
            ><i class="fas fa-trash"></i
          ></span>
        </li>`);
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
//# sourceMappingURL=todolist.js.map