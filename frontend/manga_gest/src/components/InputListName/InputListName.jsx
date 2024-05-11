import {useState} from "react";
import {addList} from "../../services/anileList.service.js";


const InputListName = () => {
    const [inputValue, setInputValue] = useState("");

    const token = localStorage.getItem("token");

    const onSubmit = (e) => {
        e.preventDefault();
        addList(token, {name: inputValue})
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Donner un nom à la liste" name="input-list-name" onChange={e => setInputValue(e.target.value)}/>
            <button type="submit">Ajouter</button>
        </form>
    )
}

export default InputListName;
