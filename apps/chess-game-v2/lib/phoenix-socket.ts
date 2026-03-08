import { Socket, Channel } from "phoenix";

class PhoenixSocketManager {
  private socket: Socket;
  private channels: Map<string, Channel> = new Map();

  constructor() {
    this.socket = new Socket("ws://localhost:4000/socket", {
      params: { 
        name: localStorage.getItem("username") || "guest_" + Math.floor(Math.random() * 1000) 
      }
    });
  }

  connect() {
    this.socket.connect();
    console.log("Connected to Phoenix Socket");
  }

  joinChannel(topic: string, params: object = {}) {
    if (this.channels.has(topic)) return this.channels.get(topic);

    const channel = this.socket.channel(topic, params);
    channel
      .join()
      .receive("ok", (resp) => console.log(`Joined ${topic}`, resp))
      .receive("error", (resp) => console.error(`Failed to join ${topic}`, resp));

    this.channels.set(topic, channel);
    return channel;
  }

  leaveChannel(topic: string) {
    const channel = this.channels.get(topic);
    if (channel) {
      channel.leave();
      this.channels.delete(topic);
    }
  }

  sendEvent(topic: string, event: string, payload: object) {
    const channel = this.channels.get(topic);
    if (channel) {
      channel.push(event, payload);
    }
  }
}

export const socketManager = new PhoenixSocketManager();
