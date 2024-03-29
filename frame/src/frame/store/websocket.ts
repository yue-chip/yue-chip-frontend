import { defineStore } from 'pinia'
import ReconWebSocket from '../websocket'

interface WebSocketState {
    webSocket: ReconWebSocket | any,
    wsMessage: any,
}

export const useWebSocketStore = defineStore({
    id: 'websocket',
    state: (): WebSocketState => ({
        webSocket: null,
        wsMessage: null,
    }),
    actions: {
        connect() {
            if (this.webSocket && this.webSocket.isOpen) return;
            //console.log(this.webSocket.isOpen);

            const token = sessionStorage.getItem("token");
              // @ts-ignore
            if (import.meta.env.VITE_WEBSOCKET) {
              const url = import.meta.env.VITE_WEBSOCKET + '/' + token
              const options = {
                url,
                messageCb: (msg: any) => {
                  this.$patch({wsMessage: msg})
                }
              }
              this.webSocket = new ReconWebSocket(options)
              console.log(this.webSocket);
            }

        },
        isConnect(): boolean {
            return this.webSocket && this.webSocket.isOpen
        },
        send(data: any) {
            if (this.webSocket) {
                this.webSocket.send(data)
            } else {
                console.error('WebSocket is not connected.')
            }
        },
        close() {
            if (this.webSocket) {
                this.webSocket.destroy()
                this.webSocket = null
            }
        },
        onMessage(msg: any) {
            this.$patch({ wsMessage: msg })
        }
    }
})
export default useWebSocketStore;
