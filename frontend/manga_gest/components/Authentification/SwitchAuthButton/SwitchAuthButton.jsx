
export default function SwitchAuthButton({switchAuth, isToggle}) {

    return (
        <button className="authButton" onClick={switchAuth}>{isToggle ? "S'inscrire" : "Se connecter"}</button>
    )
}