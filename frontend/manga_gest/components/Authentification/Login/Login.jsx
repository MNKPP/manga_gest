import s from './Login.module.scss';
import { useForm } from "react-hook-form";
export default function Login() {
    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => console.log(data);

    return (
        <section className={s.container}>
            <div className={s.leftSide}>

            </div>
            <div className={s.rightSide}>
                <h1>Connectez-vous</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className={s.groupInput}>
                        <label htmlFor="input-username">Pseudo :</label>
                        <input {...register("username")} id="input-username" type="text"/>
                    </div>

                    <div className={s.groupInput}>
                        <label htmlFor="input-password">Mot de passe :</label>
                        <input {...register("password")} id="input-password" type="password"/>
                    </div>
                    
                    <button type="submit">Se connecter</button>
                </form>
            </div>
        </section>
    )
}