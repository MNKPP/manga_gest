import s from './App.module.scss'
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import { Authentification, PrivateRoutes } from './components/index.js';
import Dashboard from "./container/Dashboard.jsx";
import {useState} from "react";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";


export default function App() {
    const [token, setToken] = useState(null);

    const handleReceiveToken = (receivedToken) => {
        setToken(receivedToken);
    }

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Authentification onReceiveToken={handleReceiveToken} />} />
                    <Route element={<PrivateRoutes token={token} />}>
                        <Route path="/dashboard" element={<Dashboard token={token}/>} />
                    </Route>
                </Routes>
            </Router>
        </>
    )
}
