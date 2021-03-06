const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  // Check post length
  if (!Validator.isLength(data.text, { min: 5, max: 200 })) {
    errors.text = "Post must be between 5 and 200 characters long";
  }

  // If post is empty...
  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
