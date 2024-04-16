import s from './AnimeInListItem.module.scss';
import {useEffect, useState} from "react";
import {fetchAnimeInList} from "../../services/anileList.service.js";
import {decrementEpisodes, incrementEpisodes} from "../../services/episode.service.js";


const AnimeInListItem = ({ listId }) => {
    const [animeInList, setAnimeInList] = useState(null);
    const [animeIds, setAnimeIds] = useState(new Set());

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchAnimeInList(listId, token)
            .then(({data}) => {
                setAnimeInList(data);
            })
            .catch((error) => {
                throw new Error(error.message);
            })
    }, [listId, token]);

    const handleIncrementClick = (animeId, setEpisodeNb) => {
        incrementEpisodes(animeId, token)
            .then(({data}) => {
                setEpisodeNb(data.watchedEpisode)
                setAnimeInList(() => {
                    if (data.watchedEpisode === data.totalEpisodes) {
                        setAnimeIds(animeIds => {
                            const newSet = new Set(animeIds);
                            newSet.add(animeId);
                            return newSet;
                        })
                        return animeInList.filter((anime) => anime.id !== animeId);
                    }
                    return animeInList
                })
            })
            .catch(error => {
                throw new Error(error.message);
            })
    }

    const handleDecrementClick = (animeId, setEpisodeNb) => {
        decrementEpisodes(animeId, token)
            .then(({data}) => {
                setEpisodeNb(data.watchedEpisode)
                setAnimeInList(() => {
                    if (data.watchedEpisode < data.totalEpisodes && animeIds.has(animeId)) {
                        setAnimeIds(animeIds => {
                            const newSet = new Set(animeIds);
                            newSet.delete(animeId);
                            return newSet;
                        })
                        return animeInList.filter((anime) => anime.id !== animeId);
                    }
                    return animeInList;
                })
            })
            .catch(error => {
                throw new Error(error.message);
            })
    }


    return (
        <div className={s['anime-list']}>
            {animeInList && animeInList.map(anime => (
                <AnimeItem
                    key={anime.id}
                    id={anime.id}
                    image={anime.image}
                    title={anime.title}
                    episode={anime.Episodes}
                    handleDecrementClick={handleDecrementClick}
                    handleIncrementClick={handleIncrementClick}
                />
            ))}
        </div>
    );
}

const AnimeItem = ({titleList, id, image, title, episode, handleIncrementClick, handleDecrementClick}) => {
    const [episodeNb, setEpisodeNb] = useState(episode[0].watchedEpisode);

    const onIncrement = () => handleIncrementClick(id, setEpisodeNb);
    const onDecrement = () => handleDecrementClick(id, setEpisodeNb);

    return (
        <div className={s['anime-in-list-item']}>
            <h1>{titleList}</h1>
            <img src={image} alt={title}/>
            <div className={s['right-side']}>
                <h2>{title}</h2>
                <div className={s['buttons']}>
                    <button onClick={onDecrement}>-</button>
                    {episode && episode.length > 0 &&
                        <p>{episodeNb} / {episode[0].totalEpisodes}</p>
                    }
                    {episodeNb >= episode[0].totalEpisodes ? '' : <button onClick={onIncrement}>+</button>}
                </div>
            </div>
        </div>
    );
}

export default AnimeInListItem;