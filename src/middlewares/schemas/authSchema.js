import joi from "joi";

const signUpSchema = joi.object({
  name: joi.string().alphanum().required(),
  email: joi.email().required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  confirmPassword: joi.ref("password"),
});

const signInSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});
