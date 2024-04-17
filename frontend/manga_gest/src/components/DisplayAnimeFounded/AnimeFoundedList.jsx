import React, { useState } from 'react'; // Fusionné l'import de useState
import s from './AnimeFoundedList.module.scss';
import AddToAnimeListButton from "../AddToAnimeListButton/AddToAnimeListButton.jsx";
import {addAnimeInList} from "../../services/anileList.service.js";

export const AnimeFoundedList = ({ animeList }) => {

    return (
        <div>
            {animeList.map((anime, index) =>
                    <AnimeFoundedItem key={index}
                                      id={anime.mal_id}
                                      title={anime.title}
                                      image={anime.images.webp.image_url}
                                      score={anime.score ? anime.score : 0}
                                      studio={anime.studios && anime.studios.length > 0 ? anime.studios[0].name : 'Unknown'}
                                      genres={anime.genres && anime.genres.length > 0 ? anime.genres.map(genre => genre.name + ' ') : 'Unknow'}
                    />
                )
            }
        </div>
    )
}

export const AnimeFoundedItem = ({id, title, image, score, studio, genres}) => {
    const existingToken = localStorage.getItem('token');


    const data = {
        title,
        image,
        score: Math.round(score),
        studio,
        genre: genres.join(', '),
        synopsis : 'sdqflmjdsmfjsqmlfdjqsmdfkqsjml'
    }

    const handleAddAnimeClick = (listId) => {
        addAnimeInList(listId, data, existingToken)
            .then(response => {
                console.log('Successfully added anime item')
            })
            .catch(error => {
                console.log('Error adding anime item')
            })
    }


    return (
        <div className={s['anime-founded-item']}>
            <img src={image} alt={title}/>
            <div>
                <h3>{title}</h3>
                <p>Studio : {studio}</p>
                <p>Score : {score}</p>
                <p>{genres}</p>
                <AddToAnimeListButton addAnimeClick={handleAddAnimeClick} />
            </div>
        </div>
    )
}