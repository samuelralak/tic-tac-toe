import { defaultBoardConfig, getBoardLayout } from './board'

it('gets board layout with default config', () => {
  const layout = getBoardLayout()
  expect(layout.length).toEqual(defaultBoardConfig.rows)
  expect(layout.flat().length).toEqual(
    defaultBoardConfig.rows * defaultBoardConfig.cols
  )
})

it('gets board layout by config', () => {
  const config = { rows: 10, cols: 10 }
  const layout = getBoardLayout(config)
  expect(layout.length).toEqual(config.rows)
  expect(layout.flat().length).toEqual(config.rows * config.cols)
})
