import { Socket } from "phoenix";

export const socket = new Socket("ws://localhost:4000/socket", {
  params: { token: "" },
});

