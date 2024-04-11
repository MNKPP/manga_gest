import s from './AnimeFoundedList.module.scss';
import AddToAnimeListButton from "../AddToAnimeListButton/AddToAnimeListButton.jsx";
export const AnimeFoundedItem = ({ title, image, score, studio, genres}) => {

    return (
        <div className={s['anime-founded-item']}>
            <img src={image} alt={title}/>
            <div>
                <h3>{title}</h3>
                <p>Studio : {studio}</p>
                <p>Score : {score}</p>
                <p>{genres}</p>
                <AddToAnimeListButton />
            </div>
        </div>
    )
}

export const AnimeFoundedList = ({ animeList }) => {
    return (
        <>
            {animeList.map((anime, index) =>
                <AnimeFoundedItem key={index}
                                  title={anime.title}
                                  image={anime.images.webp.image_url}
                                  score={anime.score ? anime.score : 0}
                                  studio={anime.studios && anime.studios.length > 0 ? anime.studios[0].name : 'Unknown'}
                                  genres={anime.genres && anime.genres.length > 0 ? anime.genres.map(genre => genre.name + ' ') : 'Unknow'}
                />
            )}
        </>
    )
}