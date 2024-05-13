import s from './SearchBar.module.scss';
import { useState } from "react";
import {fetchAnimeOnJikan, fetchRecommandations} from "../../services/anime.service.js";
import {Popcorn} from "lucide-react";

const SearchBar = ({ onFoundedAnime, setIsFounded, onNewRecommendations, setActiveView }) => {
    const [searchData, setSearchData] = useState({});
    const token = localStorage.getItem("token")

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
                setActiveView('anime');
            }).catch(error => {
            throw new Error(error);
        })
    }

    const handleRecommendations = () => {
        fetchRecommandations(token)
            .then(response => {
                console.log(response.data);
                onNewRecommendations(response.data);
                setActiveView('recommendations');
            }).catch(error => {
            throw new Error(error);
        })
    }

    return (
        <form className={s['input-container']}>
            <input type="text" placeholder="Rechercher un animé" onChange={handleInputChange}/>
            <button type="submit" onClick={handleFoundAnime}>Rechercher</button>
            <div className="cursor-pointer" onClick={handleRecommendations}>
                <Popcorn />
            </div>
        </form>
    )
}

export default SearchBar;