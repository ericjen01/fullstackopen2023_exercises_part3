const express = require("express");
const app = express();
const morgan = require("morgan");

/*const reqLogger = (req, res) => {
    console.log('body: ', req.body);
    res.status(404).send({ error: 'endpoint not known' });
  };*/

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
};

//app.use(reqLogger);
//app.use(morgan('tiny'))
//console.log('morgan('tiny'): ', morgan('tiny'));
app.use(express.json());
app.use(
  morgan((tokens, req, res) => {
    console.log("tokens: ", tokens);
    return [
      "method:",
      tokens.method(req, res),
      ", url:",
      tokens.url(req, res),
      ", status:",
      tokens.status(req, res),
      ", content-length: ",
      tokens.res(req, res, "content-length"),
      ", response time:",
      tokens["response-time"](req, res),
      " ms",
      ", body: ",
      JSON.stringify(req.body),
    ].join("");
  })
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: 5,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: 6,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

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

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  //console.log('req.body: ', req.body);

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

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
