import { uniq } from 'lodash'
import { pickFromDiagonal } from '../utils'

export const human = 'x'
export const computer = 'o'

/**
 *
 * @param board
 * @returns {*}
 */
export const staticScore = board => board.flat().filter(Boolean).length + 1

/**
 *
 * Calculates player score
 *
 * @param board
 * @param config
 * @returns {number|*}
 */
export const calculateScore = (board, config) => {
  // check rows for victor
  for (let index = 0; index < config.rows; index++) {
    const row = uniq(board[index]).join('')

    if (row.length === 1 && row === human) {
      if (row === human) {
        return staticScore(board)
      }

      return -staticScore(board)
    }
  }

  // check columns for victor
  for (let index = 0; index < config.cols; index++) {
    const column = uniq(board.map(col => col[index])).join('')

    if (column.length === 1 && column === human) {
      if (column === human) {
        return staticScore(board)
      }

      return -staticScore(board)
    }
  }

  // check diagonal values for victor
  const leftToRight = uniq(pickFromDiagonal(board).split('')).join('')
  const rightToLeft = uniq(pickFromDiagonal(board, 'right').split('')).join('')

  if (
    (leftToRight.length === 1 && leftToRight === human) ||
    (rightToLeft.length === 1 && rightToLeft === human)
  ) {
    return staticScore(board)
  }

  if (
    (leftToRight.length === 1 && leftToRight === computer) ||
    (rightToLeft.length === 1 && rightToLeft === computer)
  ) {
    return -staticScore(board)
  }

  return 0
}

/**
 *
 * MinMax algorithm to calculate opponent's best move
 *
 * @param board
 * @param depth
 * @param isMax
 * @param config
 * @returns {number|*}
 */
export function minMax(board, depth, isMax, config) {
  const score = calculateScore(board, config)
  let bestScore = -Infinity

  // human won game
  if (score === staticScore(board)) {
    return score
  }

  // computer won game
  if (score === -staticScore(board)) {
    return score
  }

  // draw
  if (score === 0) {
    return score
  }

  if (isMax) {
    for (let i = 0; i < config.rows; i++) {
      for (let j = 0; j < config.cols; j++) {
        if (board[i][j].toString() === 'false') {
          board[i][j] = human
          bestScore = Math.max(
            bestScore,
            minMax(board, depth - 1, !isMax, config)
          )
          board[i][j] = false
        }
      }
    }
  } else {
    bestScore = Infinity

    for (let i = 0; i < config.rows; i++) {
      for (let j = 0; j < config.cols; j++) {
        if (board[i][j].toString() === 'false') {
          board[i][j] = computer
          bestScore = Math.min(
            bestScore,
            minMax(board, depth - 1, !isMax, config)
          )

          board[i][j] = false
        }
      }
    }
  }

  return bestScore
}

/**
 *
 * Calculates player's next move
 *
 * @param board
 * @param config
 * @returns {{col: number, row: number}}
 */
export function nextMove(board, config) {
  let bestScore = -Infinity
  const bestMove = { row: -1, col: -1 }

  for (let i = 0; i < config.rows; i++) {
    for (let j = 0; j < config.cols; j++) {
      // Check if cell is empty
      if (!board[i][j]) {
        board[i][j] = human
        const score = minMax(board, 0, false, config)
        board[i][j] = false

        if (score > bestScore) {
          bestMove.row = i
          bestMove.col = j
          bestScore = score
        }
      }
    }
  }

  return bestMove
}
