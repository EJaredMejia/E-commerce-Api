/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Client-side environment variables
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Server-side environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production" | "test";
      readonly DATABASE_URL: string;
      readonly UPSTASH_REDIS_REST_URL: string;
      readonly UPSTASH_REDIS_REST_TOKEN: string;
      readonly FIREBASE_API_KEY: string;
      readonly FIREBASE_APP_ID: string;
      readonly FIREBASE_PROJECT_ID: string;
      readonly FIREBASE_STORAGE_BUCKET: string;
      readonly JWT_SECRET: string;
    }
  }
}

export {};
