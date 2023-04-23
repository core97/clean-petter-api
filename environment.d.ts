declare global {
  var fetch: typeof import('node-fetch').default
  type RequestInit = import('node-fetch').RequestInit
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_COOKIE_NAME: string;
      CLOUDINARY_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      DATABASE_URL: string;
      MY_SECRET_AUTH_TOKEN: string;
      NODE_ENV: 'production' | 'development' | 'test';
      PORT: string;
      SENTRY_DNS: string;
      SENTRY_SERVER_NAME: string;
      TYPEFORM_SECRET : string;
      WEB_DOMAIN : string;
    }
  }
}

export {};
