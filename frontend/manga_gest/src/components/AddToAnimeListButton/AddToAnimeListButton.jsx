import { useEffect, useState } from 'react';
import { fetchAnimeLists } from '../../services/anileList.service.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

const AddToAnimeListButton = ({ addAnimeClick }) => {
    const existingToken = localStorage.getItem("token");
    const [animeLists, setAnimeLists] = useState([]);
    const [listId, setListId] = useState(null);
    const [isLoadingLists, setIsLoadingLists] = useState(true);

    useEffect(() => {
        fetchAnimeLists(existingToken)
            .then(response => {
                setAnimeLists(response.data);
                setIsLoadingLists(false);
            })
            .catch(error => {
                setIsLoadingLists(false);
                toast.error("Erreur lors de la récupération des listes d'animes");
                throw new Error(error.message);
            });
    }, []);

    const addToAnimeAction = () => {
        addAnimeClick(listId)
            .then(() => {
                toast.success('Animé ajouté à la liste avec succès !');
            })
            .catch(() => {
                toast.error('Erreur lors de l\'ajout de l\'animé à la liste.');
            });
    }

    const receiveLisId = (e) => {
        setListId(e.target.value);
    }

    return (
        <>
            <button onClick={addToAnimeAction}>Ajouter</button>
            {isLoadingLists ? (
                <ClipLoader color={"#3498db"} loading={isLoadingLists} size={30} />
            ) : (
                <select name="input-select" id="anime-list" onChange={receiveLisId}>
                    {animeLists.map((list) => (
                        <option key={list.id} value={list.id}>{list.name}</option>
                    ))}
                </select>
            )}
        </>
    );
};

export default AddToAnimeListButton;
