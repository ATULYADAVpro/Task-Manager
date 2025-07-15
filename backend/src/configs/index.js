import { config } from 'dotenv'
config()

export const { PORT, DB_URL, DEBUG_MODE, JWT_SECRECT_KEY } = process.env