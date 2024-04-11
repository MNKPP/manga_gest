import s from './PrivateLayout.module.scss';
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

const PrivateLayout = ({ children, clickListAction }) => {
    return (
        <>
            <Header clickListAction={clickListAction} />
            <main className={s['main']}>
                { children }
            </main>
            <Footer />
        </>
    )
}

export default PrivateLayout;