import PrivateLayout from "../components/PrivateLayout/PrivateLayout.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import {useState} from "react";
import {AnimeFoundedList} from "../components/DisplayAnimeFounded/AnimeFoundedList.jsx";

const Dashboard = () => {
    const [animeListFounded, setAnimeListFounded] = useState([]);
    const [isFounded, setIsFounded] = useState(false);

    const dataFounded = (data) => {
        if (data) {
            setAnimeListFounded(data.data.data);
            setIsFounded(true);
        }
    }

    return (
        <PrivateLayout>
            <SearchBar onFoundedAnime={dataFounded}/>
            {isFounded && <AnimeFoundedList animeList={animeListFounded}/>}
        </PrivateLayout>
    )
}

export default Dashboard;