import s from './App.module.scss'
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import { Authentification, PrivateRoutes } from './components/index.js';
import Dashboard from "./container/Dashboard.jsx";

export default function App() {
    return (
        <main className={s.main}>
            <Router>
                <Routes>
                    <Route path="/" element={<Authentification />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </Router>
        </main>
    )
}
