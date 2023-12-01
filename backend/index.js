require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
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

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;  
  const person = Person.findById(id)
    .then((p) => {p
      ? res.json(p)
      : res.status(404).json({ err: "content missing" }).end();
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  const newPerson = new Person({
    name:   body.name,
    number: body.number,
  });

  newPerson
    .save()
    .then((savedPerson) => { res.json(savedPerson)})
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;
  const id = req.params.id;
  Person.findByIdAndUpdate(
    id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {res.json(updatedPerson)})
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => { res.status(204).end();})
    .catch((err) => next(err));
});

const unknownEndpoint = (req, res) => {res
  .status(404)
  .send({ error: "unknown endpoint" })
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.err(err.message);

  if (err.name === "CastError"){
    return 
    res.status(400)
    .send({ err: "malformatted id" });
  }

  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
