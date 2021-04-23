import { Injectable } from '@angular/core';
import { openDB, deleteDB } from 'idb';
import Dexie from 'dexie';
import * as loki from 'lokijs';
import { DbQuery } from '../models/dbQuery.model';
//
interface Friend {
  id?: number;
  name?: string;
  age?: number;
}
//

@Injectable({ providedIn: 'root' })
export class DbHelperService {
  private DexiDb;
  private idb: any;
  private Lokidb: any;
  private worker;
  constructor() {
    this.worker = new Worker('../../db-worker.worker.ts', { type: 'module' });

    this.DexiDb = new FriendDatabase();
    // IDB
    this.createIdbStore();
    // Loki
    this.Lokidb = new loki('Loki-test');
  }
  // // // // // // // // Worker
  callWorkertoWrite(info: DbQuery): Promise<number> {
    return new Promise((resolve, reject) => {
      this.worker.postMessage({
        action: 'write',
        payload: {
          ...info,
        },
      });
      this.worker.onmessage = (message) => {
        console.log(message);
        if (typeof message.data.status) {
          resolve(message.data.response);
        } else {
          reject(message.data.response);
        }
      };
    });
  }

  // // // // // // // // Normal
  async createIdbStore() {
    this.idb = await openDB('my-db', 1, {
      upgrade(db) {
        db.createObjectStore('idb-test');
      },
    });
  }

  transaction(info: DbQuery): Promise<number> {
    if (info.db === 'ls') {
      return new Promise((resolve, rejevt) => {
        const latency = this.writeLocalStorage(info.numberOfQuerys);
        resolve(latency);
      });
    } else if (info.db === 'loki') {
      return new Promise((resolve, rejevt) => {
        const latency = this.writeLoki(info.numberOfQuerys);
        resolve(latency);
      });
    } else if (info.db === 'idb') {
      return this.writeDataIdb(info.numberOfQuerys);
    } else if (info.db === 'dexie') {
      return this.writeDataDexi(info.numberOfQuerys);
    }
    return new Promise((resolve, rejevt) => {
      resolve(3);
    });
  }

  clearAll(): void {
    this.deleteIdb();
    this.deleteDexie();
    this.clearLs();
    this.clearLoki();
  }

  // Indexed DB with IDB
  writeDataIdb(count: number): Promise<number> {
    const startTime: number = Date.now();
    return new Promise<number>((resolve, reject) => {
      for (let i = 0; i < count; i++) {
        this.idb.put('idb-test', i, i.toString());
      }
      const endTime: number = Date.now();
      const latency = endTime - startTime;
      resolve(latency);
    });
  }

  deleteIdb() {
    console.log('in idb cleaner');
    deleteDB('idb-test')
      .then(() => {
        // console.log('idb');
      })
      .catch((err) => {
        console.log('error in idb cleaning', err);
      });
  }
  // Dexiejs
  writeDataDexi(count: number): Promise<number> {
    this.DexiDb = new FriendDatabase();
    const startTime: number = Date.now();
    return new Promise((resolve, reject) => {
      for (let i = 0; i < count; i++) {
        this.DexiDb.transaction('rw', this.DexiDb.friends, async () => {
          this.DexiDb.friends.add({ name: 'Jafar', age: 21 });
        });
      }
      const latency = Date.now() - startTime;
      resolve(latency);
    });
  }
  deleteDexie() {
    this.DexiDb.delete().then(() => {
      // console.log('done dexi');
    });
  }
  // LocalStorage
  writeLocalStorage(count: number): number {
    const startTime: number = Date.now();
    let latency = 0;
    for (let i = 0; i < count; i++) {
      localStorage.setItem(i.toString(), 'Test');
    }
    latency = Date.now() - startTime;
    return latency;
  }

  clearLs(): void {
    localStorage.clear();
  }
  // Loki js
  writeLoki(count: number): number {
    const startTime: number = Date.now();
    let latency = 0;
    this.Lokidb = new loki('Loki-test');
    const users = this.Lokidb.addCollection('test');
    for (let i = 0; i < count; i++) {
      users.insert([{ name: 'Thor', age: Math.random() }]);
    }
    latency = Date.now() - startTime;
    return latency;
  }
  clearLoki(): void {
    this.Lokidb.removeCollection('myCollection');
  }
}

class FriendDatabase extends Dexie {
  public friends!: Dexie.Table<Friend, number>;
  public constructor() {
    super('Dexie');
    this.version(1).stores({
      friends: '++id,name,age',
    });
  }
}
