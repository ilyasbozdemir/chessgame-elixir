export interface PlayerDoc {
  _id: string;
  userId: string;
  rating?: any;
  createdAt?: string | Date;
}

export interface UserDoc {
  _id: string;
  username: string;
  email: string;
}

export interface TableDoc {
  _id?: string | null;
  name: string;
  ownerId?: string | null;
  ownerName?: string | null;
  status: "waiting" | "playing" | "finished";
  createdAt?: string | Date;
  players: {
    id: string | null;
    name: string;
    color: "white" | "black" | null;
    isReady: boolean;
  }[];
}
