import s from './Header.module.scss';
import {Menu} from "lucide-react";
import {useState} from "react";
import MenuBurgerAnimeList from "../MenuBurgerAnimeList/MenuBurgerAnimeList.jsx";
const Header = ({ clickListAction }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const openMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <header className={s['header']}>
            <h1>Manga Gest</h1>
            <div className={s['menu-logo']} onClick={openMenu}>
                <Menu color={"#fff"}/>
            </div>
            { menuOpen && <MenuBurgerAnimeList clickListAction={clickListAction}/>}
        </header>
    )
}

export default Header;