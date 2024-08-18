import { io } from "socket.io-client";

export const socket = io("http://localhost:5115/", {
	autoConnect: true,
	transports: ["websocket"],
	reconnection: true,
})