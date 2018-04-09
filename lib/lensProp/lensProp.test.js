import lensProp from '.'
import view from '../view'
import set from '../set'

test('returns a lens whose focus is the specified property', () => {
  const lens = lensProp('a')
  const obj = { a: 1, b: 2 }
  const setValueResult = set(lens, 4, obj)

  expect(view(lens, obj)).toBe(1)
  expect(setValueResult).toMatchObject({ a: 4, b: 2 })
  expect(setValueResult === obj).toBeFalsy()
})
