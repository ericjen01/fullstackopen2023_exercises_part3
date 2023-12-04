require("dotenv").config();

const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("connection error, MongoDB: ", err.message);
  });


  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: [2, 'Required: min. 2 characters for Name'],
      required: [true, 'Name is required'],
    },
    number: {
      type: String,
      minLength: [3, 'Required: min. 3 digits for Number'],
      validate: {
        validator: (v) => /^\d{3}$/.test(v),
        message: (props) =>
          `${props.value} is invalid. phone must be at least 3 numbers`,
      },
      required: [true, 'Phone number is required'],
    },
  });

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
