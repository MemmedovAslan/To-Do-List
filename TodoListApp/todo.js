const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const li = document.getElementsByClassName("list-group-item");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");
const sort = document.querySelector("#sort");
const resort = document.querySelector("#re-sort");
// const first = document.getElementById("#first")

test();
eventListeners();

function test(){
    if(todoList.innerText == ""){
        todoList.setAttribute("style","border: none")
    }
}
function eventListeners(){
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);

}

function clearAllTodos(e){
    if (confirm("Bütün tapşırıqları silmək istədiyinizdən əminsiniz?")){
        todoList.innerHTML = "";
        localStorage.removeItem("todos");
        // console.log("Silindi");
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue)=== -1){
            // Axtarilan sozu tapmayanda 
        listItem.setAttribute("style", "display: none !important");
        }else{
            listItem.setAttribute("style", "display: flex");
        }
    });
}

function deleteTodo(e){
    // console.log(e.target);
    if (e.target.className === "fa-regular fa-circle-xmark"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Tapşırıq silindi...");
    }
    test();
}

function deleteTodoFromStorage(deletetodo, index){
    let todos = getTodosFromStorage();
    todos.forEach(function(i){
        if (i===deletetodo){
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    test();
}

function loadAllTodosUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){
    const newTodo = todoInput.value.trim();
    // console.log(newTodo);
    if(newTodo===""){
        /*
        <div class="alert alert-danger" role="alert">
        Qutunun içərisini boş buraxmayın!
        </div> 
        */ 
       showAlert("danger", "Keçərli bir məlumat daxil edin!");
    }else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Tapşırıq qeydə alındı...")
    }
    e.preventDefault();
}

function getTodosFromStorage(){
    let todos;
    if (localStorage.getItem("todos")=== null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;

}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
     
}

function showAlert(type, message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    // console.log(alert);
    firstCardBody.appendChild(alert);
    setTimeout(function(){
        alert.remove();
    },1000);

}

function addTodoToUI(newTodo){
    const listItem = document.createElement("li");
    const link = document.createElement("a");

    

    // link yaradiriq
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa-regular fa-circle-xmark'></i>";

    // list item yaradiriq 
    listItem.className = "list-group-item";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Yaradilan listi elave edirik
    todoList.appendChild(listItem);
    todoInput.value = "";
    todoList.setAttribute("style","border: 1px solid rgba(128, 128, 128, 0.39)")
}

// let elementList = document.querySelector(".list-group-item");

// elementList.addEventListener("mouseover", function(){
//     elementList.setAttribute("style", "background-color: #ccc");
// })

sort.addEventListener("click",()=>{
    sort.style.display = "none";
    resort.style.display = "block";
    sortList();
})

resort.addEventListener("click",()=>{
    resort.style.display = "none";
    sort.style.display = "block";
    sortList();
})

function sortList() {
    let test,
        i,
        x,
        y,
        test2,
        dir,
        count = 0;
    test = true;
    dir = "asc";
    while (test) {
        test = false;
        for (i = 0; i < li.length - 1; i++) {
            test2 = false;
            x = li[i];
            y = li[i + 1];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    test2 = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    test2 = true;
                    break;
                }
            }
        }
        if (test2) {
            li[i].parentNode.insertBefore(li[i + 1], li[i]);
            test = true;
            count++;
        } else {
            if (count == 0 && dir == "asc") {
                dir = "desc";
                test = true;
            }
        }
    }
}

