import s from './App.module.scss'
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import { Authentification, PrivateRoutes } from './components/index.js';
import Dashboard from "./container/Dashboard.jsx";
import {useState} from "react";



export default function App() {
    const existingToken = localStorage.getItem("token");
    const [token, setToken] = useState(existingToken);

    const handleReceiveToken = (receivedToken) => {
        localStorage.setItem("token", receivedToken);
        setToken(receivedToken);
    }

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Authentification onReceiveToken={handleReceiveToken} />} />
                    <Route element={<PrivateRoutes token={token} />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </Router>
        </>
    )
}
