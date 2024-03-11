import s from './Login.module.scss';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validators/authentification.validator.js";
export default function Login() {
    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(registerSchema),
    });

    // TODO: Réaliser la requête vers le serveur
    const onSubmit = (data) => console.log(data);

    return (
        <div className={s.container}>
            <div className={s.leftSide}>

            </div>
            <div className={s.rightSide}>
                <h1>Connectez-vous</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className={s.groupInput}>
                        <label htmlFor="input-username">Pseudo :</label>
                        <input {...register("username")} id="input-username" type="text"/>
                        <p className="errorMessage">{errors.username?.message}</p>
                    </div>

                    <div className={s.groupInput}>
                        <label htmlFor="input-password">Mot de passe :</label>
                        <input {...register("password")} id="input-password" type="password"/>
                        <p className="errorMessage">{ errors.password?.message}</p>
                    </div>

                    <button className="authButton" type="submit">Se connecter</button>
                </form>
            </div>
        </div>
    )
}