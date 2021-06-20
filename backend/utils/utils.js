import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { PubSub } from 'apollo-server';

const pubsub = new PubSub();

dotenv.config();

export const generateToken = (user) => {
    return jwt.sign(user, process.env.REACT_APP_JWT_SECRET, {
        expiresIn: '1h',
    });
};

export const isAuthenticated = (context) => {
    let token;
    if (context.req && context.req.headers.authorization) {
        token = context.req.headers.authorization.split('Bearer ')[1];
    } else if (context.connection && context.connection.context.Authorization) {
        token = context.connection.context.Authorization.split('Bearer ')[1];
    }

    jwt.verify(
        token,
        process.env.REACT_APP_JWT_SECRET,
        (error, decodedToken) => {
            if (!error) {
                context.user = decodedToken;
            }
        }
    );

    context.pubsub = pubsub;

    return context;
};
