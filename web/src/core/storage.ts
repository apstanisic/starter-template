import * as idb from 'idb-keyval';

/* For non static method prefix key with store name */
export default class Storage {
  store?: idb.Store;
  private storeName: string;

  constructor(store: string) {
    this.storeName = store;
    this.createStore();
  }

  // Fix for ssr
  createStore(): void {
    if (typeof window !== 'undefined' && this.store === undefined) {
      this.store = new idb.Store(`${this.storeName}-db`, this.storeName);
    }
  }

  static set(key: string, value: any): Promise<void> {
    return idb.set(key, value);
  }

  static get<T>(key: string): Promise<T> {
    return idb.get<T>(key);
  }

  static delete(key: string): Promise<void> {
    return idb.del(key);
  }

  set<T = any>(key: string, value: T): Promise<void> {
    this.createStore();
    return idb.set(key, value, this.store);
  }

  get<T>(key: string): Promise<T> {
    this.createStore();
    return idb.get<T>(key, this.store);
  }

  delete(key: string): Promise<void> {
    this.createStore();
    return idb.del(key, this.store);
  }
}
