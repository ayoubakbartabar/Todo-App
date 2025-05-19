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
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
  },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
  {
    text: "Do not wait to strike till the iron is hot, but make it hot by striking.",
    author: "William Butler Yeats",
  },
  {
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
  },
  {
    text: "He who is not courageous enough to take risks will accomplish nothing in life.",
    author: "Muhammad Ali",
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    text: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
  },
  {
    text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    author: "Roy T. Bennett",
  },
  {
    text: "The best way to predict your future is to create it.",
    author: "Abraham Lincoln",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "I am not a product of my circumstances. I am a product of my decisions.",
    author: "Stephen R. Covey",
  },
  {
    text: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
  },
  {
    text: "Action is the foundational key to all success.",
    author: "Pablo Picasso",
  },
];

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
  // Select a random quote from the quotes array
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  // Set the quote text and author in the motivation box
  quoteText.textContent = `"${randomQuote.text}"`;
  quoteAuthor.textContent = `— ${randomQuote.author}`;

  // Remove exit animation class in case it was previously applied
  motivationBox.classList.remove("slide-out");

  // Add entrance animation class to show the box with animation
  motivationBox.classList.add("slide-in");

  // Make sure the motivation box is visible
  motivationBox.style.display = "block";
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
