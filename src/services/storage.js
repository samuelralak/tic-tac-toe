export const STORAGE_KEY = 'tacToeHistory'

/**
 * Saves item to local storage
 *
 * @param data
 */
export const saveToStorage = data => {
  const initial = fetchFromStorage()
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...initial, ...data }))
}

/**
 * Fetch from local storage
 *
 * @returns {string}
 */
export const fetchFromStorage = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify({}))
}

/**
 * Deletes from local storage
 *
 */
export const deleteFromStorage = () => {
  localStorage.removeItem(STORAGE_KEY)
}
