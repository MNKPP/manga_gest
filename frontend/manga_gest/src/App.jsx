import s from './App.module.scss'
import { Authentification } from '../components/index.js';
export default function App() {
    return (
        <main className={s.main}>
            <Authentification />
        </main>
    )
}
