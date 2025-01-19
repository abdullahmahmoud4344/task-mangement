const express = require("express");
const { faker } = require("@faker-js/faker");
const cors = require("cors");

const app = express();
const port = 4000;

let tasks = [];

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/api/tasks", (req, res) => {
  if (tasks.length === 0) {
    for (let i = 0; i < 50; i++) {
      const task = {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        dueDate: faker.date.future().toLocaleDateString(),
        priority: faker.helpers.arrayElement(["Low", "Medium", "High"]),
        status: faker.helpers.arrayElement([
          "Pending",
          "In Progress",
          "Completed",
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      };
      tasks.push(task);
    }
  }

  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;
  const newTask = {
    id: faker.string.uuid(),
    title: title || faker.lorem.sentence(),
    description: description || faker.lorem.paragraph(),
    dueDate: dueDate || faker.date.future(),
    priority: priority || faker.helpers.arrayElement(["Low", "Medium", "High"]),
    status:
      status ||
      faker.helpers.arrayElement(["Pending", "In Progress", "Completed"]),
    created_at: new Date(),
    updated_at: new Date(),
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.get("/api/tasks/:id", (req, res) => {
  const { id } = req.params;

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, status } = req.body;

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description || tasks[taskIndex].description,
    dueDate: dueDate || tasks[taskIndex].dueDate,
    priority: priority || tasks[taskIndex].priority,
    status: status || tasks[taskIndex].status,
    updated_at: new Date(),
  };

  tasks[taskIndex] = updatedTask;

  res.json(updatedTask);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
