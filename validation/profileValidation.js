const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.displayname = !isEmpty(data.displayname) ? data.displayname : "";

  // if (!Validator.isLength(data.displayname, { min: 2, max: 30 })) {
  //   errors.displayname = "Display Name needs to between 2 and 30 characters";
  // }

  // if (Validator.isEmpty(data.displayname)) {
  //   errors.displayname = "Display Name is required";
  // }

  // Check if website is a valid URL
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
