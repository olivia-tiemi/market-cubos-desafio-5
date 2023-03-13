const joi = require("joi");

const registrationSchema = joi.object({
  storeName: joi.string().required().messages({
    "string.base": "Nome da loja deve ser do tipo texto.",
    "string.empty": "É necessário informar o nome.",
    "any.required": "É necessário informar o nome.",
  }),
  email: joi.string().email().required().messages({
    "string.base": "E-mail deve ser do tipo texto.",
    "string.empty": "É necessário informar o e-mail.",
    "any.required": "É necessário informar o e-mail.",
    "string.email": "E-mail deve ter um formato válido.",
    "string.email.invalid": "Endereço de e-mail inválido.",
  }),
  password: joi.string().min(5).required().messages({
    "string.base": "Senha deve ser do tipo texto.",
    "string.empty": "É necessário informar a senha.",
    "any.required": "É necessário informar a senha.",
    "string.min": "Senha deve ter pelo menos 5 caracteres.",
  }),
});

module.exports = registrationSchema;
