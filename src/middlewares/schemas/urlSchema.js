import joi from "joi";

const shortlySchema = joi.object({
  url: joi
    .string()
    .pattern(new RegExp("([a-zA-Z]{3,})://([w-]+.)+[w-]+(/[w- ./?%&=]*)?")),
});
