const {z} = require ("zod");

//Creating a object schema

const signUpSchema = z.object({
    username: z
    .string({required_error: "userName is required"})
    .trim()
    .min(3,{message: "Username requires atleat 3 characters"})
    .max(50,{message: "Username should not be greater than 50 characters"}),

    email: z
    .string({required_error: "Email is required"})
    .trim()
    .min(5,{message: "Email requires atleat 5 characters"})
    .max(50,{message: "Email should not be greater than 50 characters"}),

    password: z
    .string({required_error: "Password is required"})
    .trim()
    .min(8,{message: "Password requires atleat 8 characters"})
    .max(50,{message: "Password should not be greater than 50 characters"}),

    phone: z
    .string({required_error: "Phone number is required"})
    .trim()
    .min(6,{message: "Phone requires atleat 6 characters"})
    .max(50,{message: "Phone should not be greater than 50 characters"}),
});

const  loginSchema = z.object({
    email: z
    .string({required_error: "Email is required"})
    .trim()
    .min(5,{message: "Email requires atleat 5 characters"})
    .max(50,{message: "Email should not be greater than 50 characters"}),

    password: z
    .string({required_error: "Password is required"})
    .trim()
    .min(8,{message: "Password requires atleat 8 charactrs"})
    .max(50,{message: "Password should not be greater than 50 characters"}),


})

const contactSchema = z.object({

    username: z
    .string({required_error: "userName is required"})
    .trim()
    .min(3,{message: "Username requires atleat 3 characters"})
    .max(50,{message: "Username should not be greater than 50 characters"}),


    email: z
    .string({required_error: "Email is required"})
    .trim()
    .min(5,{message: "Email requires atleat 5 characters"})
    .max(50,{message: "Email should not be greater than 50 characters"}),

    message: z.
    string({required_error: "required_error = true"})
})


module.exports = {
    signUpSchema,
    loginSchema,
    contactSchema};