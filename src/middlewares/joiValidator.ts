import Joi from 'joi';


const schema = Joi.object({
    userName: Joi.string().required().min(5),
    password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .error(()=> new Error("check password field"))
})

const registerSchema = Joi.object({
    firstName: Joi.string().required().min(5),
    lastName: Joi.string().required().min(5),
    userName: Joi.string().required().min(5),
    phone: Joi.number().required(),
    password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()


})


const orgSchema = Joi.object({
    organisation: Joi.string().required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    products: Joi.array(),
    marketValue: Joi.string().required(),
    address: Joi.string().required(),
    ceo: Joi.string().required(),
    country: Joi.string().required(),
    noOfEmployees: Joi.number().required(),
    employees: Joi.array().required()
})


export { schema, orgSchema, registerSchema };