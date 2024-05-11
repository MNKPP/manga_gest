import s from './SearchBar.module.scss';
import { useState } from "react";
import { fetchAnimeOnJikan } from "../../services/anime.service.js";

const SearchBar = ({ onFoundedAnime, setIsFounded }) => {
    const [searchData, setSearchData] = useState({});

    const handleInputChange = (e) => {
        setSearchData(e.target.value);
    }

    const handleFoundAnime = (e) => {
        e.preventDefault();
        fetchAnimeOnJikan(searchData)
            .then(data => {
                console.log(data);
                onFoundedAnime(data);
                setIsFounded(true);
            }).catch(error => {
                throw new Error(error);
        })
    }

    return (
        <form className={s['input-container']}>
            <input type="text" placeholder="Rechercher un animé" onChange={handleInputChange}/>
            <button type="submit" onClick={handleFoundAnime}>Rechercher</button>
        </form>
    )
}

export default SearchBar;