import * as dotenv from "dotenv"
dotenv.config()

const PG_CONNECTION = process.env.DB_URL
export default PG_CONNECTION

export const secret = process.env.SECRET