import PrivateLayout from "../components/PrivateLayout/PrivateLayout.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import {useState} from "react";
// import {AnimeFoundedList} from "../components/DisplayAnimeFounded/AnimeFoundedList.jsx";
import AnimeInListItem from "../components/AnimeInListItem/AnimeInListItem.jsx";

const Dashboard = ({ token }) => {
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
            <AnimeInListItem token={token}/>
            {/*TODO : Mettre AnimeFoundedList en mode absolute pour qu'il ne sois pas dans le Dashboard*/}
            {/*{isFounded && <AnimeFoundedList animeList={animeListFounded}/>}*/}
        </PrivateLayout>
    )
}

export default Dashboard;