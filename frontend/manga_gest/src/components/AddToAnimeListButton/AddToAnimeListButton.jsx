import { useEffect, useState } from 'react';
import { fetchAnimeLists } from '../../services/anileList.service.js';

const AddToAnimeListButton = ({ onReceiveListId, addAnimeClick }) => {
    const existingToken = localStorage.getItem("token");
    const [animeLists, setAnimeLists] = useState([]);
    const [listId, setListId] = useState(null);

    useEffect(() => {
        fetchAnimeLists(existingToken)
            .then(response => {
                setAnimeLists(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const addToAnimeAction = () => {
        addAnimeClick(listId);
    }

    const receiveLisId = (e) => {
        setListId(e.target.value);
    }

    return (
        <>
            <button onClick={addToAnimeAction}>Ajouter</button>
            <select name="input-select" id="anime-list" onChange={receiveLisId}>
                {animeLists.map((list) => (
                    <option key={list.id} value={list.id}>{list.name}</option>
                ))}
            </select>
        </>
    );
};

export default AddToAnimeListButton;
