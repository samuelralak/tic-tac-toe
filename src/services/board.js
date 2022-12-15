export const defaultBoardConfig = {
  rows: 3,
  cols: 3,
}

export const layoutConfigs = [
  defaultBoardConfig,
  { rows: 4, cols: 4 },
  { rows: 5, cols: 5 },
  { rows: 6, cols: 6 },
]

/**
 *
 * Gets board layout by given configuration
 *
 * @param config
 * @returns {any[][]}
 *
 */
export const getBoardLayout = (config = defaultBoardConfig) => {
  return Array.from(Array(config.rows), _ => [
    ...Array(config.cols).fill(false),
  ])
}
