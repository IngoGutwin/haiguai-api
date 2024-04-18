export interface EnvironmentVariables {
  APP_PORT: number;
  DB_HOST: string;
  DB_USER: string;
  DB_PORT: number;
  DB_PASSWORD: string;
  DB_NAME: string;
  connectionLimit: number;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}