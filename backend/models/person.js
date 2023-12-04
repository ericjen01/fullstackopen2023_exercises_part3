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
      minLength: [3, 'Required: min. 3 characters for name...'],
      required: [true, 'Name required'],
    },
    number: {
      type: String,
      minLength: [8, 'Required: min. 8 digits for phone number... '],
      validate: {
        validator: (v) => /(^\d{3}[-]\d{4,}$)/.test(v),
        message: (props) =>
          `${props.value} Required: invalid phone number. use proper format : 123-1234 (xxx-xxxx)...`,
      },
      required: [true, 'Phone # is required'],
    },
  })

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
