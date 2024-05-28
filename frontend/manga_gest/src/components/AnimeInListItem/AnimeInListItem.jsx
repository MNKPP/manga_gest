import s from './AnimeInListItem.module.scss';
import { useEffect, useState } from "react";
import { addToFavorites, deleteAnimeInList, fetchAnimeInList } from "../../services/anileList.service.js";
import { decrementEpisodes, incrementEpisodes } from "../../services/episode.service.js";
import { CircleMinus, CirclePlus, CircleX, Star } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AnimeInListItem = ({ listId, titleList }) => {
    const [animeInList, setAnimeInList] = useState(null);
    const [animeIds, setAnimeIds] = useState(new Set());

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchAnimeInList(listId, token)
            .then(({ data }) => {
                setAnimeInList(data);
            })
            .catch((error) => {
                throw new Error(error.message);
            })
    }, [listId, token]);

    const handleIncrementClick = (animeId, setEpisodeNb) => {
        incrementEpisodes(animeId, token)
            .then(({ data }) => {
                setEpisodeNb(data.watchedEpisode)
                setAnimeInList(() => {
                    if (data.watchedEpisode === data.totalEpisodes || data.watchedEpisode === 1) {
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
            .then(({ data }) => {
                setEpisodeNb(data.watchedEpisode)
                setAnimeInList(() => {
                    if (data.watchedEpisode < data.totalEpisodes && animeIds.has(animeId) || data.watchedEpisode === 0 && animeIds.has(animeId)) {
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

    const handleDeleteClick = (animeId) => {
        deleteAnimeInList(listId, animeId, token)
            .then((response) => {
                setAnimeInList(currentAnimeInList => {
                    return currentAnimeInList.filter(anime => anime.id !== animeId);
                });
            })
            .catch((error) => {
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
                    handleDeleteClick={handleDeleteClick}
                    titleList={titleList}
                />
            ))}
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}


const AnimeItem = ({ titleList, id, image, title, episode, handleIncrementClick, handleDecrementClick, handleDeleteClick }) => {
    const [episodeNb, setEpisodeNb] = useState(episode[0].watchedEpisode);

    const token = localStorage.getItem('token');

    const onIncrement = () => handleIncrementClick(id, setEpisodeNb);
    const onDecrement = () => handleDecrementClick(id, setEpisodeNb);
    const onDeleteClick = () => handleDeleteClick(id);

    const handleAddToFavorites = (id) => {
        addToFavorites(id, token)
            .then((response) => {
                toast.success("Animé ajouté aux favoris");
            })
            .catch((error) => {
                toast.error("Failed to add anime to favorites.");
                throw new Error(error.message);
            });
    }

    return (
        <div className={s['anime-in-list-item']}>
            <img src={image} alt={title} />
            <div className={s['right-side']}>
                <div className={s['title']}>
                    <h2>{title}</h2>
                    <div className={s['logo-buttons']}>
                        {titleList !== 'Favoris' && (
                            <Star className={s['star']} onClick={() => handleAddToFavorites(id)} />
                        )}
                        <CircleX className={s['circleX']} onClick={onDeleteClick} />
                    </div>
                </div>
                {titleList !== 'Favoris' && (
                    <div className={s['buttons']}>
                        {episodeNb === 0 ? '' : <CircleMinus className={s['circleMinus']} onClick={onDecrement} />}
                        {episode && episode.length > 0 &&
                            <p>{episodeNb} / {episode[0].totalEpisodes}</p>
                        }
                        {episodeNb >= episode[0].totalEpisodes ? '' :
                            <CirclePlus className={s['circlePlus']} onClick={onIncrement} />}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AnimeItem;

