import { model, Schema } from 'mongoose'


const userSchems = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

const User = model("User", userSchems)
export default User