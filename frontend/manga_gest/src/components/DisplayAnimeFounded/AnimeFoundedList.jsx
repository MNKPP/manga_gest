import s from './AnimeFoundedList.module.scss';
import AddToAnimeListButton from "../AddToAnimeListButton/AddToAnimeListButton.jsx";
import {addAnimeInList} from "../../services/anileList.service.js";

export const AnimeFoundedList = ({ animeList, setIsFounded, isFounded}) => {

    const handleDisplayed = () => {
        setIsFounded(!isFounded);
    };

    return (
        <>
            {isFounded &&
                <div className={s['anime-founded-list']}>
                    <button onClick={handleDisplayed}>X</button>
                    {animeList.map((anime, index) =>
                        <AnimeFoundedItem key={index}
                                          id={anime.mal_id}
                                          title={anime.title}
                                          image={anime.images.webp.image_url}
                                          score={anime.score ? anime.score : 0}
                                          studio={anime.studios && anime.studios.length > 0 ? anime.studios[0].name : 'Unknown'}
                                          genres={anime.genres && anime.genres.length > 0 ? anime.genres.map(genre => genre.name + ' ') : ['Unknow']}
                                          synopsis={anime.synopsis}
                                          totalEpisodes={anime.episodes}
                        />
                    )
                    }
                </div>
            }
        </>
    )
}

export const AnimeFoundedItem = ({title, image, score, studio, genres, synopsis, totalEpisodes}) => {
    const existingToken = localStorage.getItem('token');

    const data = {
        title,
        image,
        score: Math.round(score),
        studio,
        genre: genres?.join(', '),
        synopsis,
        episodes: totalEpisodes
    }

    const handleAddAnimeClick = (listId) => {

        addAnimeInList(listId, data, existingToken)
            .then(response => {})
            .catch(error => {
                throw new Error('Error adding anime item', error.message);
            })
    }

    return (
        <div className={s['anime-founded-item']}>
            <img src={image} alt={title}/>
            <div>
                <h3>{title}</h3>
                <p>Studio : {studio}</p>
                <p>Score : {score}</p>
                <p>{genres}</p>
                <AddToAnimeListButton addAnimeClick={handleAddAnimeClick} />
            </div>
        </div>
    )
}