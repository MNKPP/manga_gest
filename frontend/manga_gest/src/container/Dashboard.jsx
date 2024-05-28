import s from './Dashboard.module.scss';
import PrivateLayout from "../components/PrivateLayout/PrivateLayout.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import { useState, useEffect } from "react";
import { AnimeFoundedList } from "../components/DisplayAnimeFounded/AnimeFoundedList.jsx";
import AnimeInListItem from "../components/AnimeInListItem/AnimeInListItem.jsx";
import { AnimeRecommendationsList } from "../components/AnimeRecommendationList/AnimeRecommendationList.jsx";
import { ToastContainer } from 'react-toastify';

const Dashboard = () => {
    const [animeListFounded, setAnimeListFounded] = useState([]);
    const [isFounded, setIsFounded] = useState(false);
    const [listId, setListId] = useState(null);
    const [listName, setListName] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [activeView, setActiveView] = useState('anime');
    const [shouldShowAnimeInListItem, setShouldShowAnimeInListItem] = useState(true);

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
            <ToastContainer position="bottom-right" />
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
                    <AnimeInListItem listId={listId} titleList={listName} />
                </div>
            }
        </PrivateLayout>
    )
}

export default Dashboard;
