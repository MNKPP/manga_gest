import s from './Login.module.scss';
import { SwitchAuthButton } from '../../index.js';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {loginSchema} from "../validators/authentification.validator.js";
import {loginService} from "../../../services/auth.service.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import DisplayError from "../DisplayError/DisplayError.jsx";

export default function Login({switchAuth, isToggle, onReceiveToken}) {
    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(loginSchema),
    });
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState(false);

    const onSubmit = (data) => {
        loginService(data)
            .then(res => {
                onReceiveToken(res.data.token);
                navigate("/dashboard");
            }).catch(e => {
                setFormErrors(true);
                throw new Error(e.response.data);
        });
    };

    return (
        <div className={s.container}>

            {formErrors && <DisplayError message="Le pseudo ou le mot de passe est incorecte"/>}

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
                        <p className="errorMessage">{errors.password?.message}</p>
                    </div>

                    <div className={s.buttons}>
                        <button className="authButton" type="submit">Se connecter</button>
                        <SwitchAuthButton switchAuth={switchAuth} isToggle={isToggle}/>
                    </div>
                </form>
            </div>
        </div>
    )
}