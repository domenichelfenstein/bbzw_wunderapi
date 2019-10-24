const express = require("express");
const bodyParser = require("body-parser");

const wunderApi = express();
wunderApi.use(bodyParser.json());

let currentTodoId = 0;
let allTodos = [];

wunderApi.post("/todos", (req, res) => {
    currentTodoId++;
    allTodos = [
        ...allTodos,
        Object.assign(req.body, { id: currentTodoId })
    ];
    res.sendStatus(200);
});

wunderApi.delete("/todos/:id", (req, res) => {
    allTodos = allTodos
        .filter(x => x.id != req.params.id);
    res.sendStatus(200);
});

wunderApi.put("/todos/:id", (req, res) => {
    const todoId = req.params.id;

    allTodos = [
        ...allTodos.filter(x => x.id != todoId),
        Object.assign(allTodos.find(x => x.id == todoId), req.body)
    ];
    res.sendStatus(200);
});

wunderApi.get("/todos", (req, res) => {
    res.json(allTodos);
});

wunderApi.listen(80, () => console.log("WunderApi started on http://localhost:80"));