import s from './Register.module.scss';
import { useForm } from "react-hook-form";

export default function Register() {
    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => console.log(data);

    return (
        <section className={s.container}>
            <div className={s.leftSide}>

            </div>
            <div className={s.rightSide}>
                <h1>Inscrivez-vous</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className={s.groupInput}>
                        <label htmlFor="input-username">Pseudo :</label>
                        <input {...register("username")} id="input-username" type="text"/>
                    </div>

                    <div className={s.groupInput}>
                        <label htmlFor="input-email">Email :</label>
                        <input {...register("email")} id="input-email" type="email"/>
                    </div>

                    <div className={s.groupInput}>
                        <label htmlFor="input-password">Mot de passe :</label>
                        <input {...register("password")} id="input-password" type="password"/>
                    </div>

                    <div className={s.groupInput}>
                        <label htmlFor="input-confirm">Confirmler mot de passe :</label>
                        <input {...register("confirm")} id="input-confirm" type="password"/>
                    </div>

                    <button type="submit">S'enregistrer</button>
                </form>
            </div>
        </section>
    )
}