const Joi = require("@hapi/joi");
const userService = require("../middlewares/user.servise");
const validateRequest = require("../middlewares/validate_request");

function registerSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(6).required(),
    address: Joi.string().required(),
    join_date: Joi.date().required(),
    phone_number: Joi.number().required(),
    product_id: Joi.number().empty(),
  });
  validateRequest(req, next, schema);
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({ message: "Registration successful" }))
    .catch(next);
}

module.exports = {
  registerSchema,
  register,
};
