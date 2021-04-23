export interface DbQuery {
  db: 'ls' | 'idb' | 'loki' | 'dexie';
  numberOfQuerys: number;
}
