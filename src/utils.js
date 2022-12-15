/**
 *
 * Concatenates element classes by the given condition
 *
 * @param classes
 * @returns {string}
 */
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

/**
 *
 * Gets diagonal values in a matrix
 *
 * @param arr
 * @param direction
 * @returns {string}
 */
export const pickFromDiagonal = (arr, direction = 'left') => {
  let values = ''

  if (direction === 'right') {
    arr = arr.slice().reverse()
  }

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (i === j) {
        values = values + arr[i][j]
      }
    }
  }

  return values
}
