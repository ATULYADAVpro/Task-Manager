class CustomErrorHander extends Error {
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
        this.success = false
    }

    static RequiredField(status = 400, message = "All fields are require") {
        return new CustomErrorHander(status, message)
    }
    static AlreadyExists(message = "Already Exists") {
        return new CustomErrorHander(409, message)
    }
    static NotFound(message = "Not found") {
        return new CustomErrorHander(404, message)
    }
    static Invalid(message = "Invaild Data") {
        return new CustomErrorHander(401, message)
    }
    static Unauthorized(message = "Unauthorized, token missing") {
        return new CustomErrorHander(401, message)
    }
    static Custom(status, message = "Unauthorized, token missing") {
        return new CustomErrorHander(status, message)
    }
}


export default CustomErrorHander