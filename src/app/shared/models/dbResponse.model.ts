export interface DbResponse {
  dbType: 'ls' | 'idb' | 'loki' | 'dexie';
  numberOfQuerys: number;
  latency: number;
  environment: 'normal' | 'webWorker';
}
