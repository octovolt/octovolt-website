import { useState, useEffect } from "react";

/**
 * getStoredValue(key, defaultValue)
 * 
 * Retrieves the stored data directly from localStorage. 
 * This does not involve the React state or reducers in any way, 
 * but is a direct retrieval from storage.
 * 
 * IMPORTANT: this needs to be called within useEffect() 
 * because window.localStorage does not exist on the server.
 * 
 * Note also that this may return a default value rather than
 * the actual stored value, if the stored value cannot be 
 * retrieved or is null for any reason, such as server side code
 * or blank slate initialization.
 * 
 * This function is intended to be used only during the initial
 * client initialization, not as a general getter function.
 */
export const getStoredValue = (key, defaultValue) => {
  const storedValue = window.localStorage.getItem(key);
  if (storedValue && storedValue.length) {
    return JSON.parse(storedValue);
  }
  return defaultValue;
}

/**
 * useLocalStorage(key, defaultValue)
 * 
 * This custom hook will place a default value in localStorage
 * and update the storage whenever the returned setValue()
 * function is called.
 *  
 * Please note: when calling setValue(), its argument must
 * have a new memory address that is different from the value it was 
 * last called with.
 * 
 * Thus, this will not call this effect:
 *   setValue(value);
 *   value.push('foo');
 *   setValue(value); // 'foo' will not be written to localStorage.
 * 
 * Instead, pass a copy of the value to setValue() to ensure the argument
 * has a new memory address:
 *   setValue([...value, 'foo']);
 */
export const useLocalStorage = (key, defaultValue) => {
  // Establish the state variables and setter functions.
  const [value, setValue] = useState(defaultValue);
  const [valueUpdatedFromStorage, setValueUpdatedFromStorage] = useState(false);

  // On page load, get the value from localStorage.
  useEffect(() => {
    setValue(getStoredValue(key, defaultValue));
    setValueUpdatedFromStorage(true);
  }, []);

  // Observe the value and update localStorage if it changes.
  useEffect(() => {
    if (valueUpdatedFromStorage) { // prevent overwrite on load.
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  return [value, setValue];
};
