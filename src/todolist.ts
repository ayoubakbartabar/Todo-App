// import files
import quotes from "./quotes.js";

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
const motivationBox = document.getElementById("motivation-box")!;
const quoteText = document.getElementById("quote-text")!;
const quoteAuthor = document.getElementById("quote-author")!;
const closeBtn = document.getElementById("close-motivation")!;

// create interface
interface Todo {
  id: string;
  title: string;
  isComplete: boolean;
}

// create todos array and ....
let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

// Motivation Box
const isMotivationClosed = localStorage.getItem("motivationClosed");

// create show Motivation Box function
const showMotivationBox = () => {
  motivationBox.classList.remove("slide-out");
  motivationBox.classList.add("slide-in");
  motivationBox.style.display = "block";
};
// create hide Motivation Box function
const hideMotivationBox = () => {
  motivationBox.classList.remove("slide-in");
  motivationBox.classList.add("slide-out");

  motivationBox.addEventListener(
    "animationend",
    () => {
      motivationBox.style.display = "none";
    },
    { once: true }
  );
};

// set if problem
if (!isMotivationClosed) {
  showMotivationBox();
} else {
  motivationBox.style.display = "none";
}

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
    showToast("Please Enter Your Todo!");
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
const showToast = (
  message: string,
  type: "success" | "error" = "error"
): void => {
  const toast = document.querySelector(`.${type}-toast`);
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
};

// create addTodoToDom function
const addTodoToDom = (todo: Todo): void => {
  const li = document.createElement("li");
  li.innerHTML = `
  <span class="todo-text">${todo.title}</span>
  <div class="actions">
    <span class="check"><i class="fas fa-check"></i></span>
    <span class="icon"><i class="fas fa-trash"></i></span>
  </div>
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

todoInput.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    addNewTodo(event);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  // get random quotes and ste styles
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteText.textContent = `"${randomQuote.text}"`;
  quoteAuthor.textContent = `— ${randomQuote.author}`;
  motivationBox.classList.remove("slide-out");
  motivationBox.classList.add("slide-in");
  motivationBox.style.display = "block";

  // rerender the item in localstorage
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

closeBtn.addEventListener("click", () => {
  motivationBox.classList.remove("slide-in");
  motivationBox.classList.add("slide-out");

  motivationBox.addEventListener(
    "transitionend",
    () => {
      motivationBox.style.display = "none";
    },
    { once: true }
  );
});
