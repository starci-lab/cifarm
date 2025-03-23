import { Socket } from "socket.io-client"

export interface UseIo {
  // the socket instance
  socket: Socket | null;
  // connect method
  connect: () => void;
}


