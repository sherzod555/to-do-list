const subButton = document.querySelector(".submit_btn");
const todoText = document.querySelector(".input_text");
const todoList = document.querySelector(".todo-list");


// To Do ga yengi note qoshish
function addTodoItem(text) {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const todoText = document.createElement("p");
    todoText.textContent = text;

    const removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.addEventListener("click", () => {
        
        todoItem.remove();

       
        removeFromLocalStorage(text);
    });

    todoItem.appendChild(todoText);
    todoItem.appendChild(removeButton);


    todoList.appendChild(todoItem);

   
    addToLocalStorage(text);
}

// Local Storagega note saqlab qoyadigan funksiya
function addToLocalStorage(text) {
    const todoItems = JSON.parse(localStorage.getItem("todos")) || [];
    todoItems.push(text);
    localStorage.setItem("todos", JSON.stringify(todoItems));
}

// Local Storagega note udalit qiladigan funksiya
function removeFromLocalStorage(text) {
    const todoItems = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedItems = todoItems.filter(item => item !== text);
    localStorage.setItem("todos", JSON.stringify(updatedItems));
}

// Local Storagedan qoshilgan notelani obkeladigan funksiya
function loadTodoItems() {
    const todoItems = JSON.parse(localStorage.getItem("todos")) || [];
    todoItems.forEach(item => {
        addTodoItem(item);
    });
}


subButton.addEventListener("click", () => {
    const value = todoText.value;
    if (value.trim() !== "") {
        addTodoItem(value);
        todoText.value = ""; 
        todoText.focus()
    }
});

// Load existing To-Do items when the page loads
loadTodoItems();