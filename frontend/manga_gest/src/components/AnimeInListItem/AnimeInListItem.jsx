import s from './AnimeInListItem.module.scss';
import {useEffect, useState} from "react";
import {fetchAnimeInList} from "../../services/anileList.service.js";

const AnimeInListItem = ({ listId }) => {
    const [animeInList, setAnimeInList] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchAnimeInList(listId, token)
            .then((data) => {
                setAnimeInList(data);
                console.log(data)
            })
            .catch((error) => {
                throw new Error(error.message);
            })
    }, [listId, token]);

    return (
        <div className={s['anime-list']}>
            { animeInList && animeInList.data && animeInList.data.map(anime => {
                return (
                    <div className={s['anime-in-list-item']} key={anime.id}>
                        <img src={anime.image} alt=""/>
                        <div className={s['right-side']}>
                            <h2>{anime.title}</h2>
                            <div className={s['buttons']}>
                                <button>-</button>
                                { anime.Episodes && anime.Episodes.length > 0 &&
                                    <p>{ anime.Episodes[0].watchedEpisode } / { anime.Episodes[0].totalEpisodes}</p>
                                }
                                <button>+</button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default AnimeInListItem;