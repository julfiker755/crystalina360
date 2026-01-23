import { io } from "socket.io-client"
import { envs } from "./envs"

export const connectIo = () => {
    return io(envs.api_url)
}