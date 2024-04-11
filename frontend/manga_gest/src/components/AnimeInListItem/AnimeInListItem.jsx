import s from './AnimeInListItem.module.scss';
import {useEffect, useState} from "react";
import {fetchAnimeInList} from "../../services/anileList.service.js";

const AnimeInListItem = () => {
    const [animeInList, setAnimeInList] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchAnimeInList(1, token)
            .then((data) => {
                setAnimeInList(data);
            })
            .catch((error) => {
                throw new Error(error.message);
            })
    }, []);

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
                                <button>+</button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default AnimeInListItem;