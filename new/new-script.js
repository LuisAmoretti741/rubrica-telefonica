import {postTodo} from "../shared/todo-service.js"

function saveTodo(event) {
    event.preventDefault();
    const form = document.getElementById('todo-form');
    const data = new FormData(form);

    const newTodo = {
        name: data.get('name'),
        lastname: data.get('lastname'),
        phone: data.get('number'),
        email: data.get('email'),
        adress: data.get('adress'),
        done: false,
    };

    postTodo(newTodo)
    .then(createdTodo => {
        console.log('Created todo:', createdTodo);
        form.reset();
        window.location.assign('../');
    })
}

document.getElementById("todo-form")
.addEventListener('submit', saveTodo)