import { JWT_SECRECT_KEY } from "../configs/index.js";
import jwt from 'jsonwebtoken'

class JwtService {
      // Method to sign a token with expiration time and optional additional options
    static sign(payload, expiry = '60m', secret = JWT_SECRECT_KEY, options = {}) {
        return jwt.sign(payload, secret, { expiresIn: expiry, ...options });
    }

    // Method to verify a token
    static verify(token, secret = JWT_SECRECT_KEY) {
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            throw new Error("Token is invalid or expired");
        }
    }
}
export default JwtService