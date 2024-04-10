import PrivateLayout from "../components/PrivateLayout/PrivateLayout.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import {useState} from "react";

const Dashboard = () => {
    const [animeListFounded, setAnimeListFounded] = useState([]);

    const dataFounded = (data) => {
        setAnimeListFounded(data);
    }

    return (
        <PrivateLayout>
            <SearchBar onFoundedAnime={dataFounded}/>

        </PrivateLayout>
    )
}

export default Dashboard;