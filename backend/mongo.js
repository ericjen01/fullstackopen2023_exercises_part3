const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("required: password as an argument: node mongo.js <password>");
  process.exit(1);
}

const password = process.argv[2];
const newPersonName = process.argv[3];
const newPersonNum = process.argv[4];

const url = `mongodb+srv://fullstackopen:${password}@cluster0.idyl0ve.mongodb.net/PhonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: newPersonName,
  number: newPersonNum,
});

Person.find({}).then((persons) => {
  console.log("Persons: ");
  persons.forEach((p) => {
    console.log(p);
  });
  mongoose.connection.close();
});

person.save().then((response) => {
  console.log(`person ${newPersonName}, number ${newPersonNum} saved`);
  mongoose.connection.close();
});
