import * as yup from 'yup';

export const memberRegisterSchema = yup.object().shape({
    username: yup.string()
        .min(4)
        .max(50)
        .required()
        .trim(),

    email: yup.string()
        .email()
        .required(),

    password: yup.string()
        .required()
        .trim(),

    confirm: yup.string()
        .oneOf([yup.ref('password'), null])
        .required()
})

export const memberLoginSchema = yup.object().shape({
    username: yup.string()
        .trim()
        .required(),

    password: yup.string()
        .required()
})