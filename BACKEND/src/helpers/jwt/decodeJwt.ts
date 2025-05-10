import jwt, { JwtPayload } from 'jsonwebtoken';

export interface DecodedToken extends JwtPayload {
    email?: string;
    role?: string;
}

const decode = (token: string, secret: string): DecodedToken | null => {
    try {
        const data = jwt.verify(token, secret) as DecodedToken;
        return data;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};

export const JwtHelper = { decode };
