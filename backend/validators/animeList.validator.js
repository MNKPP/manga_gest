import * as yup from 'yup';

export const animeListValidator = yup.object().shape({
    name: yup.string()
        .min(3)
        .max(20)
        .required()
        .trim()
})