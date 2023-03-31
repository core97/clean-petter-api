declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_COOKIE_NAME: string;
      DATABASE_URL: string;
      MY_SECRET_AUTH_TOKEN: string;
      PORT: string;
    }
  }
}

export {};
