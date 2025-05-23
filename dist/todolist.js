// import files
import quotes from "./quotes.js";
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
const motivationBox = document.getElementById("motivation-box");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const closeBtn = document.getElementById("close-motivation");
const toast = document.querySelector(".toast");
// create todos array and ....
let todos = JSON.parse(localStorage.getItem("todos") || "[]");
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
    motivationBox.addEventListener("animationend", () => {
        motivationBox.style.display = "none";
    }, { once: true });
};
// set if problem
if (!isMotivationClosed) {
    showMotivationBox();
}
else {
    motivationBox.style.display = "none";
}
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
        showToast("Please Enter Your Todo!");
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
const showToast = (message, type = "error") => {
    if (!toast)
        return;
    toast.textContent = message;
    toast.classList.remove("success", "error");
    toast.classList.add("show");
    if (type === "success") {
        toast.classList.add("success");
    }
    else {
        toast.classList.remove("success");
    }
    setTimeout(() => {
        toast.classList.remove("show");
    }, 5000);
};
// create addTodoToDom function
const addTodoToDom = (todo) => {
    const li = document.createElement("li");
    // Set inner HTML of the todo item with title and action buttons
    li.innerHTML = `
    <span class="todo-text ${todo.isComplete ? "completed" : ""}">
      ${todo.title}
    </span>
    <div class="actions">
      <span class="check">
        <i class="fas ${todo.isComplete ? "fa-times" : "fa-check"}"></i>
      </span>
      <span class="icon"><i class="fas fa-trash"></i></span>
    </div>
  `;
    // Assign the todo ID to data attribute for easy reference
    li.dataset.id = todo.id;
    // Add fade-in animation class and append the item to the list
    li.classList.add("todo-fade-enter");
    todoList.appendChild(li);
    // Trigger CSS transition for fade-in effect
    requestAnimationFrame(() => {
        li.classList.add("todo-fade-enter-active");
        li.classList.remove("todo-fade-enter");
    });
    // Handle delete button click: show confirmation dialog
    const icon = li.querySelector(".icon");
    if (icon) {
        icon.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent event bubbling
            showConfirmBox(todo.id);
        });
    }
    // Handle complete/incomplete toggle on check button click
    const check = li.querySelector(".check");
    if (check) {
        check.addEventListener("click", () => {
            // Toggle the completion state
            todo.isComplete = !todo.isComplete;
            // Select the text element and icon element inside check button
            const textEl = li.querySelector(".todo-text");
            const iconEl = check.querySelector("i");
            // Toggle the "completed" class on the todo text for strikethrough effect
            if (textEl) {
                textEl.classList.toggle("completed");
            }
            // Update the icon based on completion status
            if (iconEl) {
                if (todo.isComplete) {
                    iconEl.classList.remove("fa-check");
                    iconEl.classList.add("fa-times");
                }
                else {
                    iconEl.classList.remove("fa-times");
                    iconEl.classList.add("fa-check");
                }
            }
            // Save the updated todos array to localStorage
            setTodoInLocal();
            // Update the count of pending tasks
            updatePendingTasks();
            // Show success toast notification with appropriate message
            showToast(todo.isComplete
                ? "Todo marked as complete!"
                : "Todo marked as incomplete!", "success");
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
todoInput.addEventListener("keydown", (event) => {
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
    if (todos.length === 0)
        return;
    isClearAll = true;
    showConfirmBox("");
});
confirmYes.addEventListener("click", () => {
    if (isClearAll) {
        // If the user confirmed clearing all todos
        // Select all todo list items and add the exit animation class
        const allItems = todoList.querySelectorAll("li");
        allItems.forEach((li) => li.classList.add("todo-fade-exit"));
        // Use requestAnimationFrame to trigger CSS animation transitions
        requestAnimationFrame(() => {
            allItems.forEach((li) => {
                li.classList.add("todo-fade-exit-active"); // Activate exit animation
                li.classList.remove("todo-fade-exit"); // Remove initial exit class to trigger transition
            });
            // After the animation duration (400ms), remove all todo items from DOM and clear todos array
            setTimeout(() => {
                allItems.forEach((li) => li.remove()); // Remove all <li> elements from DOM
                todos = []; // Clear the todos array
                setTodoInLocal(); // Update localStorage to reflect the empty todos
                updatePendingTasks(); // Update the pending tasks counter
                showToast("All todos cleared!", "success"); // Show success toast notification
            }, 400);
        });
        // Reset the flag indicating clear-all action
        isClearAll = false;
    }
    else if (todoToDeleteId) {
        // If the user confirmed deleting a single todo by ID
        // Select the <li> element corresponding to the todo ID
        const li = document.querySelector(`li[data-id="${todoToDeleteId}"]`);
        // Remove the todo from the todos array by filtering it out
        todos = todos.filter((todo) => todo.id !== todoToDeleteId);
        setTodoInLocal(); // Update localStorage with the modified todos
        updatePendingTasks(); // Update the pending tasks counter
        showToast("Todo removed successfully!", "success"); // Show success toast notification
        if (li) {
            // If the list item exists in DOM, animate its removal
            li.classList.add("todo-fade-exit"); // Start exit animation
            requestAnimationFrame(() => {
                li.classList.add("todo-fade-exit-active"); // Activate exit animation
                li.classList.remove("todo-fade-exit"); // Remove initial exit class to trigger transition
                // After animation duration, remove the <li> from DOM
                setTimeout(() => {
                    li.remove();
                }, 400);
            });
        }
        // Reset the ID of the todo to delete
        todoToDeleteId = null;
    }
    // Finally, hide the confirmation dialog
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
    motivationBox.addEventListener("transitionend", () => {
        motivationBox.style.display = "none";
    }, { once: true });
});
//# sourceMappingURL=todolist.js.map