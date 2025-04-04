declare module "color-curves";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: number;
      DB_USER: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}

declare module "locale-emoji";
