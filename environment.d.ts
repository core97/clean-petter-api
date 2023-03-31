declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      MY_SECRET_AUTH_TOKEN: string;
    }
  }
}

export {};
