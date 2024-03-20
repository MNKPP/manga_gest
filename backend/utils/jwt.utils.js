import jwt from 'jsonwebtoken';

export const generateToken = ({id, role}) => {
    return new Promise((resolve, reject) => {
        const data = {id, role};
        const secret = process.env.JWT_SECRET;
        const options = {
            algorithm: 'HS512',
            expiresIn: '24h',
            audience: process.env.JWT_AUDIENCE,
            issuer: process.env.JWT_ISSUER
        };

        jwt.sign(data, secret, options, (err, token) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(token);
        });
    });
}

export const decodeToken = (token) => {
    return new Promise((resolve, reject) => {
       const secret = process.env.JWT_SECRET;
       const options = {
           audience: process.env.JWT_AUDIENCE,
           issuer: process.env.JWT_ISSUER
       };

       jwt.verify(token, secret, options, (err, decoded) => {
           if (err) {
               reject(err);
               return;
           }

           resolve(decoded);
       });
    });
}