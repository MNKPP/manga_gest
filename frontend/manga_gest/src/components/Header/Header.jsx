import s from './Header.module.scss';
import {Menu, Popcorn} from "lucide-react";
import {useState} from "react";
import MenuBurgerAnimeList from "../MenuBurgerAnimeList/MenuBurgerAnimeList.jsx";
const Header = ({ clickListAction, openRecommandation }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const openMenu = () => {
        setMenuOpen(!menuOpen);
    }


    return (
        <header className={s['header']}>
            <h1>Manga Gest</h1>
            <div className={s['right-logo']}>
                <div className={s['menu-logo']} onClick={openMenu}>
                    <Menu color={"#fff"}/>
                </div>
            </div>
            {menuOpen &&
                <MenuBurgerAnimeList clickListAction={clickListAction} openMenu={openMenu} menuOpen={menuOpen}/>}
        </header>
    )
}

export default Header;