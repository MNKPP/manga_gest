import { Login, Register } from '../index.js';
import { useState } from "react";

export default function Authentification() {
    const [toggle, setToggle] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        setToggle(!toggle);
    }

    return (
        <section>
            { toggle ? <Login /> : <Register /> }
            <button onClick={handleSubmit}>{ toggle ? "Se connecter" : "S'inscrire"}</button>
        </section>
    )
}