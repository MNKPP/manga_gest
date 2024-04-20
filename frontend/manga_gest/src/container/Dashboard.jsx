import PrivateLayout from "../components/PrivateLayout/PrivateLayout.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import {useState} from "react";
import {AnimeFoundedList} from "../components/DisplayAnimeFounded/AnimeFoundedList.jsx";
import AnimeInListItem from "../components/AnimeInListItem/AnimeInListItem.jsx";

const Dashboard = () => {
    const [animeListFounded, setAnimeListFounded] = useState([]);
    const [isFounded, setIsFounded] = useState(false);
    const [listId, setListId] = useState(null);

    const dataFounded = (data) => {
        if (data) {
            setAnimeListFounded(data.data.data);
            setIsFounded(true);
        }
    }

    const onListClickAction = (id) => {
        setListId(id);
    }

    return (
        <PrivateLayout clickListAction={onListClickAction}>
            <SearchBar onFoundedAnime={dataFounded} setIsFounded={setIsFounded} />
            {isFounded && <AnimeFoundedList animeList={animeListFounded} isFounded={isFounded} setIsFounded={setIsFounded} />}
            {!isFounded && <AnimeInListItem listId={listId}/>}
        </PrivateLayout>
    )
}

export default Dashboard;