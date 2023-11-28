const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(morgan("method-:method, status-:status, url-:url, body-:body"));
app.use(express.static("dist"));

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
};

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const count = persons.length;
  const time = new Date();
  response.send(
    `<span>phonebook has info for ${count} people
      <p>${time}</p>
    </p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  person
    ? res.json(person)
    : res.status(404).json({ error: "content missing" });
});

app.put("/api/persons/:id", (req, res) => {
  const personToChange = {
    name: req.body.name,
    number: req.body.number,
  };
  console.log("personToChange: ", personToChange);
  persons.map((p) => (p.name === req.body.name ? personToChange : p));
  res.json(personToChange);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }

  if (persons.find((p) => p.name === body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(newPerson);

  res.json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
