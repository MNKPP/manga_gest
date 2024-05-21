import s from './SearchBar.module.scss';
import { useState } from "react";
import { fetchAnimeOnJikan, fetchRecommandations } from "../../services/anime.service.js";
import { Popcorn } from "lucide-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

const SearchBar = ({ onFoundedAnime, setIsFounded, onNewRecommendations, setActiveView }) => {
    const [searchData, setSearchData] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isFetchingRecommendations, setIsFetchingRecommendations] = useState(false);
    const token = localStorage.getItem("token");

    const handleInputChange = (e) => {
        setSearchData(e.target.value);
    }

    const handleFoundAnime = (e) => {
        e.preventDefault();
        setIsSearching(true);
        fetchAnimeOnJikan(searchData)
            .then(data => {
                console.log(data);
                onFoundedAnime(data);
                setIsFounded(true);
                setActiveView('anime');
                setIsSearching(false);
            }).catch(error => {
            setIsSearching(false);
            toast.error("Erreur lors de la recherche de l'animé");
            throw new Error(error);
        });
    }

    const handleRecommendations = () => {
        setIsFetchingRecommendations(true);
        fetchRecommandations(token)
            .then(response => {
                console.log(response.data);
                if (response.data && response.data.length > 0) {
                    onNewRecommendations(response.data);
                    setActiveView('recommendations');
                } else {
                    toast.info("Aucune recommandation trouvée");
                }
                setIsFetchingRecommendations(false);
            }).catch(error => {
            setIsFetchingRecommendations(false);
            toast.error("Erreur lors de la récupération des recommandations");
            throw new Error(error);
        });
    }

    return (
        <form className={s['input-container']} onSubmit={handleFoundAnime}>
            <input type="text" placeholder="Rechercher un animé" onChange={handleInputChange} />
            <button type="submit">Rechercher</button>
            <div className="cursor-pointer" onClick={handleRecommendations}>
                <Popcorn />
            </div>
            {(isSearching || isFetchingRecommendations) &&
                <div className={s['loading-spinner']}>
                    <ClipLoader color={"#3498db"} loading={true} size={30} />
                </div>
            }
        </form>
    )
}

export default SearchBar;
