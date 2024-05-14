import s from './Dashboard.module.scss';
import PrivateLayout from "../components/PrivateLayout/PrivateLayout.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import { useState, useEffect } from "react";
import { AnimeFoundedList } from "../components/DisplayAnimeFounded/AnimeFoundedList.jsx";
import AnimeInListItem from "../components/AnimeInListItem/AnimeInListItem.jsx";
import { AnimeRecommendationsList } from "../components/AnimeRecommendationList/AnimeRecommendationList.jsx";

const Dashboard = () => {
    const [animeListFounded, setAnimeListFounded] = useState([]);
    const [isFounded, setIsFounded] = useState(false);
    const [listId, setListId] = useState(null);
    const [listName, setListName] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [activeView, setActiveView] = useState('anime'); // Nouvel état pour gérer la vue
    const [shouldShowAnimeInListItem, setShouldShowAnimeInListItem] = useState(true); // Nouvel état pour gérer l'affichage de AnimeInListItem

    const dataFounded = (data) => {
        if (data) {
            setAnimeListFounded(data.data.data);
            setIsFounded(true);
        }
    }

    const onListClickAction = (id, listName) => {
        setListId(id);
        setListName(listName);
    }

    const handleNewRecommendations = (newRecommendations) => {
        setRecommendations(newRecommendations);
    }

    useEffect(() => {
        setShouldShowAnimeInListItem(!isFounded || activeView !== 'anime');
    }, [isFounded, activeView]);

    return (
        <PrivateLayout clickListAction={onListClickAction}>
            <SearchBar
                onFoundedAnime={dataFounded}
                setIsFounded={setIsFounded}
                onNewRecommendations={handleNewRecommendations}
                setActiveView={setActiveView}
            />
            {
                activeView === 'anime' && isFounded &&
                <AnimeFoundedList
                    animeList={animeListFounded}
                    isFounded={isFounded}
                    setIsFounded={setIsFounded}
                />
            }
            {
                activeView === 'recommendations' &&
                <AnimeRecommendationsList
                    recommendations={recommendations}
                    setActiveView={setActiveView}
                />
            }
            {
                !isFounded && shouldShowAnimeInListItem &&
                <div>
                    <h2 className={s['list-name']}>{listName}</h2>
                    <AnimeInListItem listId={listId} />
                </div>
            }
        </PrivateLayout>
    )
}

export default Dashboard;