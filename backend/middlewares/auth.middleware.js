import { decodeToken } from "../utils/jwt.utils.js";

export const authTokenMiddleware = () => {

    return (req, res, next) => {

        const authHeader = req.headers['authorization'];

        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            next();
            return;
        }

        decodeToken(token)
            .then((data) => {
                req.token = data;
            })
            .catch((error) => {
                req.token = null;
            })
            .finally(() => {
                next();
            })
    }
}

export const authorizeMiddleware = (...roles) => {

    return (req, res, next) => {

        const token = req.token;

        if(!token) {
            res.sendStatus(401);
            return;
        }

        if(roles.length > 0 && !roles.includes(token.role)) {
            res.sendStatus(403);
            return;
        }

        next();
    }
}