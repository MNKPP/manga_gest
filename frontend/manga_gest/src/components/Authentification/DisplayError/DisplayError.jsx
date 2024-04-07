import s from './DisplayError.module.scss';

const displayError = ({ message }) => {

    return (
        <div className={s.container}>
            <p>{message}</p>
        </div>
    )
}

export default displayError;