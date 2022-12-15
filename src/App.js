import { uniq } from 'lodash'
import { useState } from 'react'
import {classNames, pickFromDiagonal} from "./utils";

const human = 'x'
const computer = 'o'

const defaultBoardConfig = {
  rows: 3,
  cols: 3,
}

const layoutConfigs = [
  defaultBoardConfig,
  { rows: 4, cols: 4 },
  { rows: 5, cols: 5 },
  { rows: 6, cols: 6 },
]

const staticScore = board => board.flat().filter(Boolean).length + 1

const simulateGame = (board, config) => {
  // check rows for victor
  for (let index = 0; index < config.rows; index++) {
    const row = uniq(board[index]).join('')

    if (row.length === 1 && row === human) {
      return staticScore(board)
    }

    if (row.length === 1 && row === computer) {
      return -staticScore(board)
    }
  }

  // check columns for victor
  for (let index = 0; index < config.cols; index++) {
    const column = uniq(board.map(col => col[index])).join('')

    if (column.length === 1 && column === human) {
      return staticScore(board)
    }

    if (column.length === 1 && column === computer) {
      return -staticScore(board)
    }
  }

  // check diagonal values for victor
  const leftToRight = uniq(pickFromDiagonal(board).split('')).join('')
  const rightToLeft = uniq(pickFromDiagonal(board, 'right').split('')).join('')

  if (leftToRight.length === 1 && leftToRight === human) {
    return staticScore(board)
  } else if (leftToRight.length === 1 && leftToRight === computer) {
    return -staticScore(board)
  }

  if (rightToLeft.length === 1 && rightToLeft === human) {
    return staticScore(board)
  } else if (rightToLeft.length === 1 && rightToLeft === computer) {
    return -staticScore(board)
  }

  return 0
}

function minMax(board, depth, isMax, config) {
  const score = simulateGame(board, config)

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
    let bestScore = -Infinity

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

    return bestScore
  } else {
    let bestScore = Infinity

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

    return bestScore
  }
}

function nextMove(board, config) {
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

function App() {
  const [boardConfig, setBoardConfig] = useState(defaultBoardConfig)
  const [board, setBoard] = useState(
    Array.from(Array(boardConfig.rows), _ => [
      ...Array(boardConfig.cols).fill(false),
    ])
  )
  const onPlayMove = (row, col, config) => {
    const updatedBoard = board.slice()
    updatedBoard[row][col] = human

    // computer makes move
    const computerMove = nextMove(updatedBoard, config)
    if (computerMove.row >= 0 && computerMove.col >= 0) {
      updatedBoard[computerMove.row][computerMove.col] = computer
      setBoard(updatedBoard)
    }
  }

  const onUpdateBoardLayout = layout => {
    setBoardConfig(layout)
    setBoard(
      Array.from(Array(layout.rows), _ => [...Array(layout.cols).fill(false)])
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-20">
      <div className="mx-auto max-w-3xl">
        <div className="border-b border-gray-200">
          <div className="sm:flex sm:items-baseline">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Layout
            </h3>
            <div className="mt-4 sm:mt-0 sm:ml-10">
              <nav className="-mb-px flex space-x-8">
                {layoutConfigs.map((layout, index) => (
                  <button
                    key={`${index}-${layout.rows}-${layout.cols}`}
                    onClick={() => onUpdateBoardLayout(layout)}
                    className={classNames(
                      layout === boardConfig
                        ? 'border-indigo-500 text-indigo-600 bg-indigo-100 rounded-lg'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                      'whitespace-nowrap py-2 px-2 font-medium text-sm mb-2'
                    )}
                  >
                    {layout.rows} x {layout.cols}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <table className="table-fixed text-center">
            <tbody className="divide-y divide-gray-200">
              {board.map((row, index) => (
                <tr key={`row-${index}`} className={`divide-x divide-gray-200`}>
                  {row.map((col, idx) => (
                    <td
                      key={`col-${index}-${idx}`}
                      onClick={() => onPlayMove(index, idx, boardConfig)}
                      className={classNames(
                        col === human
                          ? 'bg-green-100 text-green-700'
                          : col === computer
                          ? 'bg-red-100 text-red-700'
                          : '',
                        'py-3 cursor-pointer h-16 text-2xl '
                      )}
                    >
                      {col || '_'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
