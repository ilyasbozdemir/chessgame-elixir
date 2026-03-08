import { Socket } from "phoenix";

const isBrowser = typeof window !== "undefined";

export const socket = new Socket("ws://localhost:4000/socket", {
  params: { 
    name: isBrowser ? (localStorage.getItem("username") || "guest_" + Math.floor(Math.random() * 1000)) : "server" 
  },
  logger: (kind: string, msg: string, data: any) => {
    // console.log(`${kind}: ${msg}`, data)
  }
});

// For compatibility with any code using socketManager
export const socketManager = {
  connect: () => socket.connect(),
  joinChannel: (topic: string, params: object = {}) => {
    const channel = socket.channel(topic, params);
    channel.join()
      .receive("ok", (resp) => console.log(`Joined ${topic}`, resp))
      .receive("error", (resp) => console.error(`Failed to join ${topic}`, resp));
    return channel;
  },
  leaveChannel: (topic: string) => {
    // This is handled by ChannelProvider usually
  },
  sendEvent: (topic: string, event: string, payload: object) => {
    // This requires keeping track of channels
  }
};
