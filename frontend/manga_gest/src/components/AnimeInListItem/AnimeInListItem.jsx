import s from './AnimeInListItem.module.scss';
import {useEffect} from "react";
import {fetchAnimeInList} from "../../services/anileList.service.js";

const AnimeInListItem = ({ token }) => {

    // TODO : FetchAnimeInList (ça dépendra du type de liste ici)
    useEffect(() => {
        fetchAnimeInList(1, token)
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                throw new Error(error.message);
            })
    }, []);

    return (
        <div className={s['anime-in-list-item']}>
            <img src="" alt=""/>
            <div>
                <h2>Titre de l'animé ici</h2>
                <div className={s['buttons']}>
                    <button>-</button>
                    <button>+</button>
                </div>
            </div>
        </div>
    )
}

export default AnimeInListItem;