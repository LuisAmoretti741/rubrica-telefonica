import {getAllTodos, changeDoneStatus} from "./shared/todo-service.js"

function displayTodos(todos){

    const todosContainer = document.getElementById('todos-container');
    todosContainer.innerHTML = "";

    for (const todo of todos) {
        
        const card = document.createElement('div');
        card.classList.add('todo-card');

        const nameSpan = document.createElement('span');
        nameSpan.appendChild(
            document.createTextNode(`${todo.name} ${todo.lastname}`)
        );

        card.appendChild(nameSpan);
        todosContainer.appendChild(card);


        const actionsDiv = document.createElement('div');
        let completeActionIcon;
        if (todo.done) {
            completeActionIcon = "↺"
        } else {
            completeActionIcon = "✓"
        }
        const completeBtn = document.createElement('button');
        completeBtn.appendChild(document.createTextNode(completeActionIcon));
        completeBtn.classList.add("action");

        completeBtn.addEventListener('click', () => {
            changeDoneStatus(todo.id, !todo.done)
            .then(_ => {

                todo.done = !todo.done;
                displayTodos(todos);
            })
        })

        actionsDiv.appendChild(completeBtn);

        const detailLink = document.createElement('a');
        detailLink.appendChild(document.createTextNode("🠊"));
        detailLink.classList.add("action");
        detailLink.href = './detail/info-client.html?todoId=' + todo.id;

        actionsDiv.appendChild(detailLink);

        card.appendChild(actionsDiv);

        todosContainer.appendChild(card);
    }

    function searchTodos(text) {
    const searchText = text.toLowerCase();

    const filteredTodos = todos.filter(todo =>
        todo.name.toLowerCase().includes(searchText) ||
        todo.lastname.toLowerCase().includes(searchText)
    );

    displayTodos(filteredTodos);
    }

    document.getElementById("search-contact")
    .addEventListener("input", (event) => {
        searchTodos(event.target.value);
    });


}

function orderByName() {
    todos.sort((t1, t2) => t1.name.localeCompare(t2.name));
    displayTodos(todos);
}

document.getElementById("sort-name-btn")
.addEventListener('click', orderByName);

function orderByLastname() {
    todos.sort((t1, t2) => t1.lastname.localeCompare(t2.lastname));
    displayTodos(todos);
}

document.getElementById("sort-lastname-btn")
.addEventListener('click', orderByLastname);

let todos = []

getAllTodos().then(results => {
    todos = results;
    displayTodos(todos)
})
