import { connect } from 'mongoose'
import { DB_URL } from './index.js'

async function connectDB() {
    try {
        await connect(DB_URL)
        console.log(`Database connection Success`)

    } catch (error) {
        console.log(`Database connection Success due to ` + error.message)
    }
}

export default connectDB