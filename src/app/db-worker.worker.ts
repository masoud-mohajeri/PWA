/// <reference lib="webworker" />
import { openDB } from 'idb';
import Dexie from 'dexie';
import * as loki from 'lokijs';
import { DbQuery } from './shared/models/dbQuery.model';

interface Friend {
  id?: number;
  name?: string;
  age?: number;
}
addEventListener('message', ({ data }) => {
  // console.log('web Worker says hi');
  let response;
  if (data.action === 'write') {
    transaction(data.payload)
      .then((ltc) => {
        // console.log('write', data);
        postMessage({ response: ltc, status: true });
      })
      .catch((err) => {
        // console.log('Error while insert Queries : ', err);
        postMessage({ response: err, status: false });
      });
  } else {
    response = 'Error in input';
    postMessage({ response: 'Error in input', status: false });
  }
});

// // // // // // // // // // // // // // //
// Dexi.js Configuration
class FriendDatabase extends Dexie {
  public friends!: Dexie.Table<Friend, number>;
  public constructor() {
    super('Dexie');
    this.version(1).stores({
      friends: '++id,name,age',
    });
  }
}
// // Initializ DBs
// Dexi
let DexiDb = new FriendDatabase();
// IDB
createIdbStore();
// Loki
let Lokidb: any = new loki('Loki-test');
// // // // // // // // // // // // // // //
let idb: any;
async function createIdbStore() {
  idb = await openDB('my-db', 1, {
    upgrade(db) {
      db.createObjectStore('idb-test');
    },
  });
}

function transaction(info: DbQuery): Promise<number> {
  if (info.db === 'loki') {
    return new Promise((resolve, rejevt) => {
      const latency = writeLoki(info.numberOfQuerys);
      resolve(latency);
    });
  } else if (info.db === 'idb') {
    return writeDataIdb(info.numberOfQuerys);
  } else if (info.db === 'dexie') {
    return writeDataDexi(info.numberOfQuerys);
  }
  return new Promise((resolve, reject) => {
    reject('ls is not available in worker');
  });
}
// Indexed DB with IDB
function writeDataIdb(count: number): Promise<number> {
  const startTime: number = Date.now();
  return new Promise<number>((resolve, reject) => {
    for (let i = 0; i < count; i++) {
      idb.put('idb-test', Math.random(), Math.random().toString());
    }
    const endTime: number = Date.now();
    const latency = endTime - startTime;
    resolve(latency);
  });
}
// Dexiejs
function writeDataDexi(count: number): Promise<number> {
  DexiDb = new FriendDatabase();

  const startTime: number = Date.now();
  return new Promise((resolve, reject) => {
    for (let i = 0; i < count; i++) {
      DexiDb.transaction('rw', DexiDb.friends, async () => {
        DexiDb.friends.add({ name: 'Jafar', age: 21 });
      });
    }
    const latency = Date.now() - startTime;
    resolve(latency);
  });
}
// Loki js
function writeLoki(count: number): number {
  const startTime: number = Date.now();
  let latency = 0;
  Lokidb = new loki('Loki-test');
  const users = Lokidb.addCollection('test');
  for (let i = 0; i < count; i++) {
    users.insert([{ name: 'Thor', age: Math.random() }]);
  }
  latency = Date.now() - startTime;
  return latency;
}
