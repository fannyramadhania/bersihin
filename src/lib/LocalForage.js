import localforage from "localforage";

// Set item ke localforage
export const setItem = async (key, value) => {
  try {
    await localforage.setItem(key, value);
    console.log(`✅ Set "${key}" success`);
  } catch (error) {
    console.error(`❌ Error setting item "${key}":`, error);
  }
};

// Get item dari localforage
export const getItem = async (key) => {
  try {
    const value = await localforage.getItem(key);
    console.log(`📦 Get "${key}":`, value);
    return value;
  } catch (error) {
    console.error(`❌ Error getting item "${key}":`, error);
    return null;
  }
};

// Remove item dari localforage
export const removeItem = async (key) => {
  try {
    await localforage.removeItem(key);
    console.log(`🗑️ Removed "${key}"`);
  } catch (error) {
    console.error(`❌ Error removing item "${key}":`, error);
  }
};
