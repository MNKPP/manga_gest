import s from './MenuBurgerAnimeList.module.scss';
import {useEffect, useState} from "react";
import {fetchAnimeLists} from "../../services/anileList.service.js";
import {CirclePlus} from "lucide-react";
import InputListName from "../InputListName/InputListName.jsx";

const MenuBurgerAnimeList = ({ clickListAction, openMenu, menuOpen }) => {
    const existingToken = localStorage.getItem("token");

    const [animeList, setAnimeList] = useState([]);

    useEffect(() => {
        fetchAnimeLists(existingToken)
            .then(data => {
                setAnimeList(data);
            })
            .catch(error => {
                throw new Error(error.message);
            })
    }, [])

    const onListClickAction = (id, listName) => {
        clickListAction(id, listName);
        openMenu(!menuOpen);
    }

    return (
        <>
            <div className={s['menu-burger-anime-list']}>
                <div>
                    {animeList.data && animeList.data.length > 0 && animeList.data.map((animeList) => {
                        return <div className={s['anime-list']} id={animeList.id}
                                    onClick={() => onListClickAction(animeList.id, animeList.name)} key={animeList.id}>
                            {animeList.name}
                        </div>
                    })}
                </div>
                <div className={s['button']}>
                    <CirclePlus className={s['circlePlus']} size={30} />
                </div>
                {/*<div className={s['input-list-name']}>*/}
                {/*    <InputListName />*/}
                {/*</div>*/}
            </div>
        </>
    )
}

export default MenuBurgerAnimeList;