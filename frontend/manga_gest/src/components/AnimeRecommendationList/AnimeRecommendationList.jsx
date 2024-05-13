import s from './AnimeRecommendationsList.module.scss'
import AddToAnimeListButton from "../AddToAnimeListButton/AddToAnimeListButton.jsx";
import {addAnimeInList} from "../../services/anileList.service.js";
import {AnimeFoundedItem} from "../DisplayAnimeFounded/AnimeFoundedList.jsx";

export const AnimeRecommendationsList = ({ recommendations }) => {
    return (
        <div className={s['anime-founded-list']}>
            <h2>Recommandations</h2>
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