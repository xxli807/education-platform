/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_YOUTUBE_API_KEY: string
  // add other VITE_ prefixed env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}