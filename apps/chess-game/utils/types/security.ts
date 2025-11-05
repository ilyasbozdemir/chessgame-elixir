export type Sensitive<T> = T & { __sensitive?: true };
export type Encrypted<T> = T & { __encrypted?: true };
export type Hashed<T> = T & { __hashed?: true };

export type UserBackend = { //ornek
  id: string;
  name: string;
  email: Sensitive<string>;
  token: Sensitive<string>;
};

