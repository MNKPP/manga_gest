import s from './AnimeRecommendationsList.module.scss'
import {AnimeFoundedItem} from "../DisplayAnimeFounded/AnimeFoundedList.jsx";
import {XCircle} from "lucide-react";



export const AnimeRecommendationsList = ({ recommendations, setActiveView }) => {

    const handleDisplayed = () => {
        setActiveView('anime');
    };

    return (
        <div className={s['anime-founded-list']}>
            <h2>Recommandations</h2>
            <div className={s['x-circle']}>
                <XCircle onClick={handleDisplayed}/>
            </div>
            {recommendations.map((recommendation, index) =>
                <AnimeFoundedItem key={index}
                                  id={recommendation.anime.mal_id}
                                  title={recommendation.anime.title}
                                  image={recommendation.anime.images.jpg.image_url}
                                  score={recommendation.anime.score}
                                  studio={recommendation.anime.studios[0]?.name}
                                  genres={recommendation.anime.genres.map(genre => genre.name)}
                                  synopsis={recommendation.anime.synopsis}
                                  totalEpisodes={recommendation.anime.episodes}
                />
            )}
        </div>
    )
}