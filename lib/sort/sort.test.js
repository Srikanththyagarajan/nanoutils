import sort from '.'
import descend from '../descend'
import za from '../za'
import identity from '../identity'

test('it sorts an array', () => {
  const numbers = [1, 2, 3, 4, 5]
  expect(sort(descend(identity), numbers)).toEqual([5, 4, 3, 2, 1])

  const strings = ['1', '2', '3', '4', '5']
  expect(sort(za(identity), strings)).toEqual(['5', '4', '3', '2', '1'])
})
