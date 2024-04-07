import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Authentification } from "../index.js";

const PrivateRoutes = ({ token }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
        }
    }, [token]);

    return (
        <>
            { isAuthenticated ? <Outlet /> : <Authentification />}
        </>
    );
}

export default PrivateRoutes;