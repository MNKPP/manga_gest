import s from './MenuBurgerAnimeList.module.scss';
import {useEffect, useState} from "react";
import {fetchAnimeLists} from "../../services/anileList.service.js";

const MenuBurgerAnimeList = ({ clickListAction }) => {
    const existingToken = localStorage.getItem("token");

    const [animeList, setAnimeList] = useState([]);


    useEffect(() => {
        fetchAnimeLists(existingToken)
            .then(data => {
                console.log(data)
                setAnimeList(data);
            })
            .catch(error => {
                throw new Error(error.message);
            })
    }, [])

    const onListClickAction = (id) => {
        clickListAction(id)
    }

    return (
        <div className={s['menu-burger-anime-list']}>
            { animeList.data && animeList.data.length > 0 && animeList.data.map((animeList) => {
                return <div className={s['anime-list']} id={animeList.id} onClick={() => onListClickAction(animeList.id)} key={animeList.id}>
                    { animeList.name }
                </div>
            }) }
        </div>
    )
}

export default MenuBurgerAnimeList;