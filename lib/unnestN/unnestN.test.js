var unnestN = require('.')

test('removes N nesting levels', () => {
  const val = unnestN(2, [1, [2, 3], [[4, [5]], 6]])
  expect(val).toEqual([1, 2, 3, 4, [5], 6])
})

test('returns array with no changes if N is 0', () => {
  const val = unnestN(0, [1, [2, 3], [[4, 5], 6]])
  expect(val).toEqual([1, [2, 3], [[4, 5], 6]])
})
