const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// GET route
app.get("/api/users", (req, res) => {
  res.json(users); // Retrieve all users
});

// POST route
app.post("/api/users", (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT route
app.put("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const updatedUser = req.body;
  const index = users.findIndex((user) => user.id === userId);

  if (index !== -1) {
    updatedUser.id = userId;
    users[index] = updatedUser;
    res.json(updatedUser);
  } else {
    res.status(404).send("User not found");
  }
});

// DELETE route
app.delete("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const index = users.findIndex((user) => user.id === userId);

  if (index !== -1) {
    users.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("User not found");
  }
});

// OPTIONS route
app.options("/api/users", (req, res) => {
  res.set("Allow", "GET, POST, PUT, DELETE, OPTIONS");
  res.send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
