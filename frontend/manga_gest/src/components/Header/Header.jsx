import s from './Header.module.scss';
import {Menu} from "lucide-react";
import {useState} from "react";
import MenuBurgerAnimeList from "../MenuBurgerAnimeList/MenuBurgerAnimeList.jsx";
import ModalConfig from '../ModalConfig/ModalConfig.jsx';

const Header = ({ clickListAction, openRecommandation }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openMemberConfig, setIsOpenMemberConfig] = useState(false);

    const openMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const onOpenMemberConfig = () => {
        setIsOpenMemberConfig(!openMemberConfig);
    }

    return (
        <header className={s['header']}>
            <h1>Manga Gest</h1>
            <div className={s['right-logo']}>
                <div className={s['avatar']} onClick={onOpenMemberConfig}></div>
                <div className={s['menu-logo']} onClick={openMenu}>
                    <Menu color={"#fff"}/>
                </div>
            </div>
            {menuOpen &&
                <MenuBurgerAnimeList clickListAction={clickListAction} openMenu={openMenu} menuOpen={menuOpen}/>}
            <ModalConfig isOpen={openMemberConfig} onClose={onOpenMemberConfig} />
        </header>
    )
}

export default Header;
