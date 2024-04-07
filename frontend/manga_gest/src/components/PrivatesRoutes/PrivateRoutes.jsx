import {Outlet} from "react-router-dom";
import Dashboard from "../../container/Dashboard.jsx";
import {Authentification} from "../index.js";


const PrivateRoutes = () => {
    const token = true;

    return (
        <>
            { token ? <Outlet /> : <Authentification />}
        </>
    );
}

export default PrivateRoutes;