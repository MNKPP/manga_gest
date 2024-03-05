import * as yup from "yup";

const registerSchema = yup.object({
    username: yup.string()
        .min(3, 'Le nom d\'utilisateur doit comporter au moins 3 caractères')
        .max(20, 'Le nom d\'utilisateur ne peut pas comporter plus de 20 caractères')
        .required('Le nom d\'utilisateur est obligatoire'),

    email: yup.string()
        .email('L\'adresse e-mail n\'est pas valide')
        .required('L\'adresse e-mail est obligatoire'),

    password: yup.string()
        .min(8, 'Le mot de passe doit comporter au moins 8 caractères')
        .required('Le mot de passe est obligatoire'),

    confirm: yup.string()
        .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas')
        .required('La confirmation du mot de passe est obligatoire'),

}).required('Tous les champs sont obligatoires')


export {
    registerSchema
}