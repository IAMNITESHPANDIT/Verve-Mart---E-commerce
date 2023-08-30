import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setAsyncStorageData(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting data for key ${key}:`, error);
  }
}

export async function getAsyncStorageData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error getting data for key ${key}:`, error);
    return null;
  }
}

export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      //   console.log("Retrieved value:", value);
      return value; // Return the retrieved value
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
  return null; // Return null if there was an error or the value was not found
};

// Function to print all data stored in AsyncStorage
export const printAllAsyncStorageData = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();

    const allData = await AsyncStorage.multiGet(allKeys);

    // allData is an array of key-value pairs
    // Each item in allData is an array with [key, value]
    allData.forEach(([key, value]) => {
      console.log(`Key: ${key}, Value: ${value}`);
    });
  } catch (error) {
    console.error("Error printing AsyncStorage data:", error);
  }
};
