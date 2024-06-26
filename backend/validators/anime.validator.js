import * as yup from 'yup';

export const animeValidator = yup.object().shape({
    title: yup.string(),

    studio: yup.string(),

    genre: yup.string(),

    image: yup.string(),

    score: yup.number(),

    synopsis: yup.string(),

    trailer: yup.string(),

})