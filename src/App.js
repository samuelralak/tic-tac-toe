import {uniq} from "lodash";
import {useState} from "react";

const human = "x"
const computer = "o"
const boardConfig = {
    rows: 3,
    cols: 3
}

const pickFromDiagonal = (arr, direction = "left") => {
    let values = ''

    if (direction === "right") {
        arr = arr.slice().reverse()
    }

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (i === j) {
                values = values + arr[i][j]
            }
        }
    }

    return values;
}

const staticScore = (board) => board.flat().filter(Boolean).length + 1
const canMakeMove = (board) => board.flat().filter(Boolean).length >= 1

const simulateGame = (board, config) => {
    // check rows for victor
    for (let index = 0; index < config.rows; index++) {
        const row = uniq(board[index]).join("")

        if (row.length === 1 && row === human) {
            return staticScore(board)

        } else if (row.length === 1 && row === computer) {
            return -(staticScore(board))

        }
    }

    // check columns for victor
    for (let index = 0; index < config.cols; index++) {
        const column = uniq(board.map(col => col[index])).join("")

        if (column.length === 1 && column === human) {
            return staticScore(board)

        } else if (column.length === 1 && column === computer) {
            return -(staticScore(board))

        }
    }

    // check diagonal values for victor
    const leftToRight = uniq(pickFromDiagonal(board).split("")).join("")
    const rightToLeft = uniq(pickFromDiagonal(board, "right").split("")).join("")

    if (leftToRight.length === 1 && leftToRight === human) {
        return staticScore(board)

    } else if (leftToRight.length === 1 && leftToRight === computer) {
        return -(staticScore(board))

    }

    if (rightToLeft.length === 1 && rightToLeft === human) {
        return staticScore(board)

    } else if (rightToLeft.length === 1 && rightToLeft === computer) {
        return -(staticScore(board))

    }

    return 0
}

function minMax(board, depth, isMax) {
    let score = simulateGame(board, boardConfig);
    let bestScore = -Infinity;

    // human won game
    if (score === staticScore(board)) {
        return score;
    }

    // computer won game
    if (score === -(staticScore(board))) {
        return score;
    }

    // draw
    if (canMakeMove(board) === false) {
        return 0;
    }


    if (isMax) {
        for (let i = 0; i < boardConfig.rows; i++) {
            for (let j = 0; j < boardConfig.cols; j++) {
                if (!board[i][j]) {
                    board[i][j] = human;
                    bestScore = Math.max(bestScore, minMax(board, depth + 1, !isMax));
                    board[i][j] = false;
                }
            }
        }
    } else {
        bestScore = Infinity;

        for (let i = 0; i < boardConfig.rows; i++) {
            for (let j = 0; j < boardConfig.cols; j++) {
                if (!board[i][j]) {
                    board[i][j] = computer;
                    bestScore = Math.min(bestScore, minMax(board, depth + 1, !isMax));
                    board[i][j] = false;
                }
            }
        }
    }

    return bestScore
}

function nextMove(board) {
    let bestScore = -Infinity;
    let bestMove = {row: -1, col: -1};

    for (let i = 0; i < boardConfig.rows; i++) {
        for (let j = 0; j < boardConfig.cols; j++) {

            // Check if cell is empty
            if (!board[i][j]) {
                board[i][j] = human;
                let score = minMax(board, 0, false);
                board[i][j] = false;

                if (score > bestScore) {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestScore = score;
                }
            }
        }
    }

    return bestMove;
}


function App() {
    const [board, setBoard] = useState(Array.from(Array(3), _ => [...Array(3).fill(false)]))
    const onPlayMove = (row, col) => {
        const updatedBoard = board.slice()
        updatedBoard[row][col] = human
        const computerMove = nextMove(updatedBoard)
        updatedBoard[computerMove.row][computerMove.col] = computer
        setBoard(updatedBoard)
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <div className="flex flex-col mt-8">
                    <table className="table-fixed text-center">
                        <tbody className="divide-y divide-gray-200">
                        {board.map((row, index) => (
                            <tr key={`row-${index}`} className="divide-x divide-gray-200">
                                {row.map((col, idx) => (
                                    <td key={`col-${index}-${idx}`} className="py-3 cursor-pointer h-16" onClick={() => onPlayMove(index, idx)}>{col}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;
