import { DEBUG_MODE } from "../configs/index.js";
import CustomErrorHandler from "../utils/CustomErrorHandler.js"

export default async function errorHandler(err,req, res, next) {
    // defualt error paasing globally
    let statuCode = 500
    let data = {
        message: "Internal Server Error.",
        success: false,
        ...(DEBUG_MODE === "true" && { originalError: err.message })
    }

    // custom error handler passing globally
    if (err instanceof CustomErrorHandler) {
        statuCode = err.status;
        data = {
            message: err.message,
            success: false
        }
    }

    return res.status(statuCode).json(data)
} 