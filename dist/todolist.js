// get elements from index.html
const $ = document;
const todoInput = $.querySelector(".todo-value");
const addTodo = $.querySelector(".add-todo");
const clearAllTodo = $.querySelector(".clear-todos");
const removeTodo = $.querySelector(".icon");
const todoList = $.querySelector(".todoList");
const pendingTask = document.querySelector(".pendingTasks");
const confirmBox = document.getElementById("confirmBox");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");
// create todos array and ....
let todos = JSON.parse(localStorage.getItem("todos") || "[]");
// create variable for remove todo
let todoToDeleteId = null;
let isClearAll = false;
// create function for show alert
const showConfirmBox = (todoID) => {
    todoToDeleteId = todoID;
    confirmBox.classList.add("show");
};
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
    updatePendingTasks();
    // input handler
    todoInput.value = "";
    todoInput.focus();
};
// create pending task function
const updatePendingTasks = () => {
    const pendingCount = todos.filter((todo) => !todo.isComplete).length;
    pendingTask.textContent = `${pendingCount}${pendingCount !== 1 ? "" : ""}`;
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
    }, 3000);
};
// create addTodoToDom function
const addTodoToDom = (todo) => {
    const li = document.createElement("li");
    li.innerHTML = `
    ${todo.title}
    <span class="icon"><i class="fas fa-trash"></i></span>
  `;
    li.dataset.id = todo.id;
    li.classList.add("todo-fade-enter");
    todoList.appendChild(li);
    requestAnimationFrame(() => {
        li.classList.add("todo-fade-enter-active");
        li.classList.remove("todo-fade-enter");
    });
    const icon = li.querySelector(".icon");
    if (icon) {
        icon.addEventListener("click", (e) => {
            e.stopPropagation();
            showConfirmBox(todo.id);
        });
    }
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
    updatePendingTasks();
});
clearAllTodo.addEventListener("click", () => {
    if (todos.length === 0)
        return;
    isClearAll = true;
    showConfirmBox("");
});
confirmYes.addEventListener("click", () => {
    if (isClearAll) {
        const allItems = todoList.querySelectorAll("li");
        allItems.forEach((li) => li.classList.add("todo-fade-exit"));
        requestAnimationFrame(() => {
            allItems.forEach((li) => {
                li.classList.add("todo-fade-exit-active");
                li.classList.remove("todo-fade-exit");
            });
            setTimeout(() => {
                allItems.forEach((li) => li.remove());
                todos = [];
                setTodoInLocal();
                updatePendingTasks();
            }, 400);
        });
        isClearAll = false;
    }
    else if (todoToDeleteId) {
        const li = document.querySelector(`li[data-id="${todoToDeleteId}"]`);
        todos = todos.filter((todo) => todo.id !== todoToDeleteId);
        setTodoInLocal();
        updatePendingTasks();
        if (li) {
            li.classList.add("todo-fade-exit");
            requestAnimationFrame(() => {
                li.classList.add("todo-fade-exit-active");
                li.classList.remove("todo-fade-exit");
                setTimeout(() => {
                    li.remove();
                }, 400);
            });
        }
        todoToDeleteId = null;
    }
    confirmBox.classList.remove("show");
});
confirmNo.addEventListener("click", () => {
    todoToDeleteId = null;
    isClearAll = false;
    confirmBox.classList.remove("show");
});
//# sourceMappingURL=todolist.js.map