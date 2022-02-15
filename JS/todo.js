let todoUserInput = document.getElementById("todoUserInput");
let addTodoButton = document.getElementById("addTodoButton");
let todoItemsContainer = document.getElementById("todoItemsContainer");
let updateTodoBtn = document.getElementById("updateTodoBtn");
let saveTodoBtn = document.getElementById("saveTodoBtn");
let sNumber = 0;
let inputTextId = "";

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
      return [];
    } else {
      return parsedTodoList;
    }
  }
let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;
console.log(todosCount);
saveTodoBtn.onclick = function(){
    todosCount = 1
    for(let todo of todoList){
        todo.uniqueNo = todosCount;
        todosCount++;
    }
    localStorage.setItem("todoList", JSON.stringify(todoList));
    todoItemsContainer.innerHTML = "";
    loadTodos();
}
addTodoButton.onclick = function(){
    if(todoUserInput.value===""){
        alert("Enter todo");
    }
    else{
        // sNumber++;
        // createAndAppendTodo(sNumber);
        // todoUserInput.value = "";
        todosCount = todoList.length + 1;
        let newTodo = {
            text: todoUserInput.value,
            uniqueNo: todosCount
        };
        todoList.push(newTodo);
        createAndAppendTodo(newTodo);
        todoUserInput.value = "";
    }
}
updateTodoBtn.onclick = function(){
    let inputEl = document.getElementById(inputTextId);
    inputEl.textContent = todoUserInput.value;

    updateTodoBtn.classList.add("d-none");
    addTodoButton.classList.remove("d-none");

    todoUserInput.focus();

    let myInputId = inputTextId.slice(5);

    for (let todo of todoList){
        if(todo.uniqueNo==myInputId){
            todo.text = todoUserInput.value;
        }
    }
    todoUserInput.value = "";
}
function onDeleteTodo(todoId){
    let todoEl = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoEl);
    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
          return true;
        } else {
          return false;
        }
      });
    todoList.splice(deleteElementIndex, 1);
    todosCount = 0
    for(let todo of todoList){
        todosCount++;
        todo.uniqueNo = todosCount;
    }
    todoItemsContainer.innerHTML = "";
    loadTodos();
}
function onEditTodo(inputId){
    inputTextId = inputId;
    let inputText = document.getElementById(inputId);
    todoUserInput.value = inputText.innerHTML;
    todoUserInput.focus();
    updateTodoBtn.classList.remove("d-none");
    addTodoButton.classList.add("d-none");

}

function createAndAppendTodo(todo){
    let todoId = "todo" + todo.uniqueNo;
    let inputId = "input" + todo.uniqueNo;
    let todoEl = document.createElement("li");
    todoEl.id = todoId;
    todoEl.classList.add("d-flex","justify-content-between","bg-info","m-1","p-2","rounded");
    todoItemsContainer.appendChild(todoEl);

    let textContainer = document.createElement("div");
    let serialNumber = document.createElement("p");
    let userInputText = document.createElement("p");
    userInputText.id = inputId;
    userInputText.textContent = todo.text;
    serialNumber.textContent = todo.uniqueNo;
    textContainer.classList.add("d-flex");
    serialNumber.classList.add("pr-4");
    textContainer.appendChild(serialNumber);
    textContainer.appendChild(userInputText);

    let buttonContainer = document.createElement("div");
    let editBtn = document.createElement("button");
    editBtn.id = "edit" + todo.uniqueNo;
    editBtn.textContent = "EDIT";
    editBtn.classList.add("mr-3","btn","btn-secondary");
    editBtn.onclick = function(){
        onEditTodo(inputId);
    }

    let deleteBtn = document.createElement("button");
    deleteBtn.id = "deleteBtn" + todo.uniqueNo;
    deleteBtn.textContent = "DELETE";
    deleteBtn.classList.add("btn","btn-danger");
    deleteBtn.onclick = function(){
        onDeleteTodo(todoId);
    }
    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);

    todoEl.appendChild(textContainer);
    todoEl.appendChild(buttonContainer);


}

function loadTodos(){
    for (let todo of todoList){
        createAndAppendTodo(todo);
    }
}

loadTodos();

