var dropLastWhile = require('.')

test('Drops elements of array until cb becomes false', () => {
  const val = dropLastWhile(i => i !== 1, [5, 4, 3, 2, 1, 5, 2])
  expect(val).toEqual([5, 4, 3, 2, 1])
})
