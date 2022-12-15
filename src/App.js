import { useState } from 'react'
import { classNames } from './utils'
import {
  defaultBoardConfig,
  getBoardLayout,
  layoutConfigs,
} from './services/board'
import { computer, human, nextMove } from './services/player'
import SaveHistory from './components/SaveHistory'

function App() {
  const [boardConfig, setBoardConfig] = useState(defaultBoardConfig)
  const [board, setBoard] = useState(getBoardLayout(boardConfig))

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
    setBoard(getBoardLayout(layout))
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <SaveHistory config={boardConfig} gameState={board} />
        </div>

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
