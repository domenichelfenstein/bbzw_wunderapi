const express = require("express");
const bodyParser = require("body-parser");

const wunderApp = express();
wunderApp.use(bodyParser.json());

let currentTodoId = 0;
let allTodos = [];

wunderApp.post("/todos", (req, res) => {
    currentTodoId++;
    allTodos = [
        ...allTodos,
        Object.assign(req.body, { id: currentTodoId, state: "open" })
    ];
    res.sendStatus(200);
});

wunderApp.delete("/todos/:id", (req, res) => {
    allTodos = allTodos
        .filter(x => x.id != req.params.id);
    res.sendStatus(200);
});

wunderApp.put("/todos/:id", (req, res) => {
    const todoId = req.params.id;

    allTodos = [
        ...allTodos.filter(x => x.id != todoId),
        Object.assign(allTodos.find(x => x.id == todoId), req.body)
    ];
    res.sendStatus(200);
});

wunderApp.put("/todos/:id/done", (req, res) => {
    const todoId = req.params.id;

    allTodos = [
        ...allTodos.filter(x => x.id != todoId),
        Object.assign(allTodos.find(x => x.id == todoId), { state: "done" })
    ];
    res.sendStatus(200);
});

wunderApp.get("/todos", (req, res) => {
    res.json(allTodos.slice().sort((a, b) => a.id - b.id).reverse());
});
wunderApp.get("/todos/open", (req, res) => {
    res.json(allTodos
        .filter(x => x.state === "open"));
});

wunderApp.use('/', express.static("frontend"));

wunderApp.listen(80, () => console.log("WunderApi started on http://localhost:80"));