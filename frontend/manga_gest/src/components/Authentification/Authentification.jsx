import s from './Authentification.module.scss';
import { Login, Register } from '../index.js';
import { useState } from "react";

export default function Authentification({onReceiveToken}) {
    const [isToggle, setToggle] = useState(true);

    const switchAuth = (e) => {
        e.preventDefault();
        setToggle(!isToggle);
    }

    return (
        <section className={s.section}>
            { isToggle ? <Login switchAuth={switchAuth} isToggle={isToggle} onReceiveToken={onReceiveToken}/> : <Register switchAuth={switchAuth}/> }
        </section>
    )
}