import { Socket } from "socket.io-client"

export interface UseWs {
  // the socket instance
  socket: Socket | null;
  // update the socket instance
  updateSocket: () => void;
}


