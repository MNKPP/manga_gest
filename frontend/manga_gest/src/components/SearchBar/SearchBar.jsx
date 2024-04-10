import s from './SearchBar.module.scss';

const SearchBar = () => {

    return (
        <div className={s['input-container']}>
            <input type="text" placeholder="Rechercher un animé"/>
            <button type="submit">Rechercher</button>
        </div>
    )
}

export default SearchBar;