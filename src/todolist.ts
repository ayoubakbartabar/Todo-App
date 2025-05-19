// get elements from index.html
const $ = document;
const todoInput = $.querySelector(".todo-value") as HTMLInputElement;
const addTodo = $.querySelector(".add-todo") as HTMLButtonElement;
const clearAllTodo = $.querySelector(".clear-todos") as HTMLButtonElement;
const removeTodo = $.querySelector(".icon") as HTMLButtonElement;
const todoList = $.querySelector(".todoList") as HTMLUListElement;
const pendingTask = document.querySelector(".pendingTasks")!;
const confirmBox = document.getElementById("confirmBox")!;
const confirmYes = document.getElementById("confirmYes")!;
const confirmNo = document.getElementById("confirmNo")!;
const motivationBox = document.getElementById(
  "motivation-box"
) as HTMLDivElement;
const closeBtn = document.getElementById(
  "close-motivation"
) as HTMLButtonElement;
const quoteText = document.getElementById("quote-text") as HTMLParagraphElement;
const quoteAuthor = document.getElementById(
  "quote-author"
) as HTMLParagraphElement;
// create interface
interface Todo {
  id: string;
  title: string;
  isComplete: boolean;
}

// create todos array and ....
let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

// Motivation Box
// Motivation Box Array
const isMotivationClosed = localStorage.getItem("motivationClosed");
const quotes = [
  {
    text: "Discipline is the bridge between goals and accomplishment.",
    author: "Jim Rohn",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "Motivation is what gets you started. Habit is what keeps you going.",
    author: "Jim Ryun",
  },
];

// create variable for remove todo
let todoToDeleteId: string | null = null;
let isClearAll = false;

// create function for show alert
const showConfirmBox = (todoID: string) => {
  todoToDeleteId = todoID;
  confirmBox.classList.add("show");
};

// create add new todo Function
const addNewTodo = (event: Event) => {
  // set preventDefault method
  event.preventDefault();

  //   set if problem for check the input
  if (!todoInput.value.trim()) {
    showError("Please Enter Your Todo!");
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
const showError = (message: string): void => {
  const errorToast = document.querySelector(".error-toast");
  if (!errorToast) return;

  errorToast.textContent = message;
  errorToast.classList.add("show");

  setTimeout(() => {
    errorToast.classList.remove("show");
  }, 3000);
};

// create addTodoToDom function
const addTodoToDom = (todo: Todo): void => {
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
    icon.addEventListener("click", (e: MouseEvent) => {
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
  if (todos.length === 0) return;

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
  } else if (todoToDeleteId) {
    const li = document.querySelector(
      `li[data-id="${todoToDeleteId}"]`
    ) as HTMLLIElement;
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

