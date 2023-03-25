declare namespace NodeJS {
  interface ProcessEnv {
    OPENAI_ORGANIZATION_ID: string;
    OPENAI_API_KEY: string;
    CLIENT_URL: string;
    STORAGE_ACCOUNT_NAME: string;
    STORAGE_ACCESS_KEY: string;
  }
}
