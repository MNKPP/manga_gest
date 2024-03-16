import * as yup from 'yup';

const memberRegisterSchema = yup.object().shape({
    username: yup.string()
        .min(4)
        .max(20)
        .required()
        .trim(),

    email: yup.string()
        .email()
        .required(),

    password: yup.string()
        .required()
        .trim(),

    confirm: yup.string()
        .oneOf(yup.ref('password'), null)
        .required()
})

const memberLoginSchema = yup.object().shape({
    username: yup.string()
        .trim()
        .required(),

    password: yup.string()
        .required()
})

export {
    memberRegisterSchema,
    memberLoginSchema
};