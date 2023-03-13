const joi = require("joi");

const productSchema = joi.object({
  title: joi.string().max(200).required().messages({
    "string.base": "Título deve ser do tipo texto.",
    "string.empty": "É necessário informar o título.",
    "any.required": "É necessário informar o título.",
    "string.max": "Título excedeu o limite de 200 caracteres.",
  }),
  description: joi.string().max(2000).required().messages({
    "string.base": "Descrição deve ser do tipo texto.",
    "string.empty": "É necessário informar a descrição.",
    "any.required": "É necessário informar a descrição.",
    "string.max": "Descrição excedeu o limite de 2000 caracteres.",
  }),
  price: joi.number().positive().required().messages({
    "number.base": "Preço deve ser do tipo número.",
    "number.positive": "Preço não pode ser um valor negativo.",
    "any.required": "É necessário informar o preço.",
  }),
  stock: joi.number().positive().required().messages({
    "number.base": "Estoque deve ser do tipo número.",
    "number.positive": "Estoque não pode ser um valor negativo.",
    "any.required": "É necessário informar o estoque.",
  }),
  sold: joi.number().positive().allow(0).required().messages({
    "number.base": "Quantidade vendida deve ser do tipo número.",
    "number.positive": "Quantidade vendida não pode ser um valor negativo.",
    "any.required": "É necessário informar a quantidade vendida.",
  }),
  categoryId: joi.number().positive().required().messages({
    "number.base": "Categoria id deve ser do tipo número.",
    "number.positive": "Categoria id não pode ser um valor negativo.",
    "any.required": "É necessário informar o id da categoria.",
  }),
});

module.exports = productSchema;
