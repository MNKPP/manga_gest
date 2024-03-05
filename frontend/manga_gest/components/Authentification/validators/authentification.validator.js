import * as yup from "yup";

const registerSchema = yup.object({
    username: yup.string().min(3).max(20).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    confirm: yup.string().oneOf([yup.ref('password')]).required(),
}).required()

export {
    registerSchema
}