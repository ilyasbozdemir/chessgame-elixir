declare module "phoenix" {
  //
  // 🔹 Socket
  //
  export class Socket {
    constructor(endpoint: string, opts?: Record<string, any>);
    connect(): void;
    disconnect(code?: number, reason?: string): void;
    channel(topic: string, params?: Record<string, any>): Channel;
  }

  //
  // 🔹 Channel
  //
  export class Channel {
    /** Join the channel */
    join(): Push;

    /** Push a message to the server */
    push<T = any>(event: string, payload?: T, timeout?: number): Push;

    /** Listen for an event from the server */
    on<T = any>(event: string, callback: (payload: T) => void): void;

    /** Remove a listener */
    off(event: string): void;

    /** Leave the channel */
    leave(): void;
  }

  //
  // 🔹 Push
  //
  export class Push {
    /** Handle responses from the server for this push/join */
    receive(
      status: "ok" | "error" | string,
      callback: (response: any) => void
    ): Push;
  }

  //
  // 🔹 Presence
  //
  export class Presence {
    static syncState(currentState: any, newState: any, onJoin?: (key: string, current: any, newPres: any) => void, onLeave?: (key: string, current: any, leftPres: any) => void): any;
    static syncDiff(currentState: any, diff: any, onJoin?: (key: string, current: any, newPres: any) => void, onLeave?: (key: string, current: any, leftPres: any) => void): any;
    static list(presences: any, chooser?: (key: string, pres: any) => any): any[];
  }
}
