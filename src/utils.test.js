import { classNames, pickFromDiagonal } from './utils'

it('picks diagonal values from matrix', () => {
  const matrix = [
    ['e', 'r', 't'],
    ['a', 's', 'd'],
    ['g', 'j', 'k'],
  ]
  expect(pickFromDiagonal(matrix)).toEqual('esk')
  expect(pickFromDiagonal(matrix, 'right')).toEqual('gst')
})

it('joins class names', () => {
  expect(classNames('firstClass', 'secondClass')).toEqual(
    'firstClass secondClass'
  )
})
