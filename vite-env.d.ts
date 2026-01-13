interface ImportMetaEnv {
    readonly API_SLA_MS: number;
    readonly VITE_API_BASE_URL: string;
    readonly VITE_API_TIMEOUT: number;
    readonly VITE_USE_MOCK_API: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  