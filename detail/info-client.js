import {getTodo, deleteTodo, changeDoneStatus} from "../shared/todo-service.js"

function displayTodo(todo) {
    const nameTodo = document.getElementById('todo-name-and-lastname');
    nameTodo.innerHTML = todo.name + " " + todo.lastname;

    const phoneTodo = document.getElementById('todo-phone');
    phoneTodo.innerHTML = todo.phone;

    const emailtodo = document.getElementById('todo-email');
    emailtodo.innerHTML = todo.email;

    const adresstodo = document.getElementById('todo-adress');
    adresstodo.innerHTML = todo.adress;

    const doneSpan = document.getElementById('todo-done');
    if (todo.done) {
        doneSpan.innerHTML = 'completato';
    } else {
        doneSpan.innerHTML = 'da completare'
    }

    const statusBtn = document.getElementById("status-btn");
    if (todo.done) {
        statusBtn.innerHTML = "riattiva";
    } else {
        statusBtn.innerHTML = "completa";
    }

}

function deleteTodoAndRedirect() {

    if (confirm("Vuoi veramente cancellare il todo???")) {
        deleteTodo(selectedTodo.id).then(_ => {
            window.location.assign('../')
        });  
    }
}

function changeStatus() {
    changeDoneStatus(selectedTodo.id, !selectedTodo.done)
    .then(_ => {
        selectedTodo.done = !selectedTodo.done;
        displayTodo(selectedTodo);
    })
}

document.getElementById("status-btn")
.addEventListener("click", changeStatus);

document.getElementById("delete-btn")
.addEventListener("click", deleteTodoAndRedirect)

const searchParams = new URLSearchParams(window.location.search);

const id = searchParams.get('todoId');

let selectedTodo;

getTodo(id).then(result => {
    selectedTodo = result;
    displayTodo(selectedTodo)
});