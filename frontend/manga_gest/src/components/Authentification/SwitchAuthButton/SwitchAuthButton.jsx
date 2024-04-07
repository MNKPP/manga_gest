import s from './SwithAuthButton.module.scss';
export default function SwitchAuthButton({switchAuth, isToggle}) {

    return (
        <a className={s.link} onClick={switchAuth}>{isToggle ? "Vous n'êtes pas inscrit ? " : "Vous êtes déjà inscrit ?"}</a>
    )
}