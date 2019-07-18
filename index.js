const express = require("express");

const server = express();

server.use(express.json());
let numberOfRequests = 0;
projects = [];

// middleware que checa se o projeto existe

function projectExists(req, res, next) {
  if (!req.body.id) {
    return res.status(400).json({ error: "project doesn't exist" });
  }
  return next();
}

// middleware qde log das requisições
function logRequest(req, res, next) {
  numberOfRequests++;
  console.log(`Número de requisições: ${numberOfRequests}`);
  return next();
}

server.use(logRequest);

// retorna todos os projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

// retornando um projeto
server.get("/projects/:index", projectExists, (req, res) => {
  const { index } = req.params;
  return res.json(projects[index]);
});

//criando um novo projeto

server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);
  return res.json(project);
});

// editando um projeto

server.put("/projects/:id", projectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);
  project.title = title;
  return res.json(project);
});

// deletando um projeto

server.delete("/projects/:id", projectExists, (req, res, next) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id === id);
  projects.splice(projectIndex, 1);
  return res.send();
});

// tasks

server.post("/projects/:id/tasks", projectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
