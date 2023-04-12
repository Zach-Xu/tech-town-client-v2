import { useState, useEffect } from 'react';
import { SocketMessage } from '../types/dto/socketMessageDTO';

const useWebSocket = (token: string | null) => {

    const [message, setMessage] = useState<string>();
    const [webSocket, setWebSocket] = useState<WebSocket>();
    const [readyState, setReadyState] = useState<number>(0);

    useEffect(() => {
        if (token != null) {
            const socket = new WebSocket(`${process.env.WEBSOCKET_BASE_URL}/${token}`);
            socket.onopen = (event) => {
                setReadyState(WebSocket.OPEN)
            }

            socket.onmessage = (event) => {
                setMessage(event.data)
            };

            // Send ping message every 30 seconds
            const pingInterval = setInterval(() => {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send("ping");
                }
            }, 30000);

            setWebSocket(socket);

            return () => {
                clearInterval(pingInterval);
                socket.close();
                setReadyState(WebSocket.CLOSING)
            };
        }
    }, [token]);


    const sendMessage = (message: SocketMessage) => {
        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            webSocket.send(JSON.stringify(message));
        }
    };

    return { message, setMessage, sendMessage, readyState };
};

export default useWebSocket;