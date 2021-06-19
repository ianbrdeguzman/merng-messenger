import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (user) => {
    return jwt.sign(user, process.env.REACT_APP_JWT_SECRET, {
        expiresIn: '1h',
    });
};

export const isAuthenticated = (context) => {
    if (context.req && context.req.headers.authorization) {
        const token = context.req.headers.authorization.split('Bearer ')[1];

        jwt.verify(
            token,
            process.env.REACT_APP_JWT_SECRET,
            (error, decodedToken) => {
                if (!error) {
                    context.user = decodedToken;
                }
            }
        );
    }
    return context;
};
