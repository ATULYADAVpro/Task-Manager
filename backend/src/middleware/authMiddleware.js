import User from "../models/userModel.js";
import CustomErrorHander from "../utils/CustomErrorHandler.js";
import JwtService from "../utils/JwtService.js";


export default async function authMiddleware(req, res, next) {
    try {
        // Getting the Beare token from authorization header
        const authHeader = req.headers.authorization;
        console.log(authHeader)
        if (!authHeader || !authHeader.startWith("Bearer ")) {
            return next(CustomErrorHander.Unauthorized())
        }

        const token = authHeader.split(" ")[1]
        const decodeTokens = JwtService.verify(token)
        const user = await User.findById(decodeTokens.id).select("-password")
        if (!user) { return next(CustomErrorHander.NotFound("User not found")) }

        req.user = user
        next()
    } catch (error) {
        next(CustomErrorHander.Custom(401,"Token invaild or expired."))
    }
}