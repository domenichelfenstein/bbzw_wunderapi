async function displayTodos() {
    const todos = await fetch("http://localhost/todos")
        .then(x => x.json());

    const list = document.querySelector("ul");
    list.innerHTML = "";
    todos.forEach(todo => {
        const item = document.createElement("li");
        const span = document.createElement("span");
        span.innerText = todo.text;
        span.classList.add(todo.state);
        span.addEventListener("click", () => onDone(todo.id));
        item.appendChild(span);

        const remove = document.createElement("a");
        remove.addEventListener("click", () => onRemove(todo.id));
        item.appendChild(remove);

        list.appendChild(item);
    });
}
displayTodos();

const onAdd = (evnt) => {
    evnt.preventDefault();

    const inputField = document.querySelector("input");
    const text = inputField.value;
    inputField.value = "";
    fetch("http://localhost/todos", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text
        })
    })
        .then(displayTodos);
}

const onDone = (id) => {
    fetch(`http://localhost/todos/${id}/done`, {
        method: "PUT"
    })
        .then(displayTodos);
}

const onRemove = (id) => {
    fetch(`http://localhost/todos/${id}`, {
        method: "DELETE"
    })
        .then(displayTodos);
}

document.querySelector("form").addEventListener("submit", onAdd);