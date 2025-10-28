import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";

const stack = pulumi.getStack();

// 🔹 Basit dev ortam config
const envConfig = {
  mongoPort: 27017,
  postgresPort: 5432,
  skipPush: true,
};

// 🧩 MongoDB
const mongoImage = new docker.Image("chess_mongodb", {
  build: {
    context: "../apps/backend/mongodb",
    platform: "linux/amd64",
  },
  imageName: "docker.io/library/chess_mongodb:latest",
  skipPush: envConfig.skipPush,
});

const mongoContainer = new docker.Container("chess_mongodb_container", {
  image: mongoImage.imageName,
  ports: [{ internal: 27017, external: envConfig.mongoPort }],
  name: `chess-mongodb-${stack}`,
});

// 🧩 PostgreSQL (Elixir için)
const postgresImage = new docker.Image("chess_postgres", {
  build: {
    context: "../apps/backend/postgres",
    platform: "linux/amd64",
  },
  imageName: "docker.io/library/chess_postgres:latest",
  skipPush: envConfig.skipPush,
});

const postgresContainer = new docker.Container("chess_postgres_container", {
  image: postgresImage.imageName,
  ports: [{ internal: 5432, external: envConfig.postgresPort }],
  name: `chess-postgres-${stack}`,
  envs: [
    "POSTGRES_USER=postgres",
    "POSTGRES_PASSWORD=postgres",
    "POSTGRES_DB=chess_game",
  ],
});

// 🔹 Output
export const urls = {
  mongo: "mongodb://localhost:27017",
  postgres: "postgres://postgres:postgres@localhost:5432/chess_game",
};
