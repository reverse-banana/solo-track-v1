// This code sets up and manages an IndexedDB database for the Solo Tracker application.

import { openDB } from 'idb';

// Define database name and version
const DB_NAME = 'SoloTrackerDB';
const DB_VERSION = 2; // Increment version to trigger upgrade

// Create a promise that opens the database
const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db, oldVersion, newVersion, transaction) {
    // This function runs when the database is first created or needs an upgrade
    if (oldVersion < 1) {
      // Create initial object stores
      db.createObjectStore('templates', { keyPath: 'id', autoIncrement: true });
      db.createObjectStore('dailyNotes', { keyPath: 'date' });
    }
    if (oldVersion < 2) {
      // Add index for template name in version 2
      const templateStore = transaction.objectStore('templates');
      templateStore.createIndex('nameIndex', 'name', { unique: false });
    }
    // More object stores can be added here as needed
  },
});

// Export a DataManager object with methods to interact with the database
export const DataManager = {
  // Save an item to a specified store
  async saveItem(storeName, item) {
    const db = await dbPromise;
    return db.put(storeName, item);
  },

  // Retrieve an item from a specified store using its key
  async getItem(storeName, key) {
    const db = await dbPromise;
    return db.get(storeName, key);
  },

  // Retrieve all items from a specified store
  async getAllItems(storeName) {
    const db = await dbPromise;
    return db.getAll(storeName);
  },

  // Delete an item from a specified store using its key
  async deleteItem(storeName, key) {
    const db = await dbPromise;
    return db.delete(storeName, key);
  },

  // Clear all items from a specified store
  async clearStore(storeName) {
    const db = await dbPromise;
    return db.clear(storeName);
  },

  // Search for templates by name
  async searchTemplatesByName(name) {
    const db = await dbPromise;
    const tx = db.transaction('templates', 'readonly');
    const store = tx.objectStore('templates');
    const index = store.index('nameIndex');
    return index.getAll(IDBKeyRange.bound(name, name + '\uffff'));
  },
};

// This DataManager provides a simple API for other parts of the application
// to interact with the IndexedDB storage, abstracting away the complexity
// of direct database operations.