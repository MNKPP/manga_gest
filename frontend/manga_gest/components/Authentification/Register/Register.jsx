import s from './Register.module.scss';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from '../validators/authentification.validator.js'
import {SwitchAuthButton} from "../../index.js";


export default function Register({ switchAuth}) {
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
                <h1>Inscrivez-vous</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className={s.groupInput}>
                        <label htmlFor="input-username">Pseudo :</label>
                        <input {...register("username")} id="input-username" type="text"/>
                        <p className="errorMessage">{errors.username?.message}</p>
                    </div>

                    <div className={s.groupInput}>
                        <label htmlFor="input-email">Email :</label>
                        <input {...register("email")} id="input-email" type="email"/>
                        <p className="errorMessage">{errors.email?.message}</p>
                    </div>

                    <div className={s.groupInput}>
                        <label htmlFor="input-password">Mot de passe :</label>
                        <input {...register("password")} id="input-password" type="password"/>
                        <p className="errorMessage">{errors.password?.message}</p>
                    </div>

                    <div className={s.groupInput}>
                        <label htmlFor="input-confirm">Confirmer mot de passe :</label>
                        <input {...register("confirm")} id="input-confirm" type="password"/>
                        <p className="errorMessage">{errors.confirm?.message}</p>
                    </div>

                    <button className="authButton" type="submit">S'enregistrer</button>
                    <SwitchAuthButton switchAuth={switchAuth} />
                </form>
            </div>
        </div>
    )
}