import _set from '../_set'
import { multipleCompare } from '../helpers/time'

test('can test if a set has some value (not only primitives)', () => {
  const arr = [false, 1, { a: 1 }, '123', [0, true, '2', { a: 3 }], a => a + 1, function foo() { return 'bar'; }]
  const set = _set(arr)
  arr.forEach(element => expect(set.has(element)).toBe(true))
})

test('can extract array without duplicates', () => {
  const arr = [1, 1, { a: 2 }, { a: 2 }, [3], [3], { a: 2 }, { a: 2 }, 1, 1]
  const set = _set(arr)
  expect(set.values()).toEqual([1, { a: 2 }, [3]])
})

test('can concatenate existing set with new array values', () => {
  const arr = [1, 2, 3]
  const set = _set(arr)
  expect(set.concat([2, 3, 4]).values()).toEqual([1, 2, 3, 4])
})

test('cannot support circular objects and arrays', () => {
  const arr1 = [1, 2, 3]
  const arr2 = [2, 3, 4]
  arr1.push(arr2)
  arr2.push(arr1)
  expect(() => _set(arr1)).toThrowError('Converting circular structure to JSON')

  const obj1 = { a: { b: { c: 1 }}}
  const obj2 = { b: { c: { d: 1 }}}
  obj1.a.b.d = obj2
  obj2.b.c.e = obj1
  expect(() => _set([obj1, obj2])).toThrowError('Converting circular structure to JSON')
})

test('can distinct anonymous funtions', () => {
  const [ anonymous1, anonymous2 ] = _set().concat([() => '123', () => '123']).values()
  expect(anonymous1 + '').toBe('() => \'123\'')
  expect(anonymous2 + '').toBe('() => \'123\'')
})

test('compares to old implementation for small samples (performance test)', () => {
  const f1 = (arr1, arr2) => _set(arr1).concat(arr2).values()
  const f2 = (arr1, arr2) => arr1.concat(arr2).reduce((acc, item) => {
    return acc.indexOf(item) === -1
      ? acc.concat(item)
      : acc
  }, [])

  const smallSets = [
    // 5 common elements
    [ [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], [ -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5] ],
    // no common
    [ [ -10, -9, -8, -7, -6, -5, -4, -3, -2, -1 ], [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ] ],
    // all common
    [ [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ] ]
  ]
  const expectedSmallResults = [
    [ -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
    [ -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
    [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
  ]

  const receivedSmallResults = multipleCompare(
    f1,
    f2,
    smallSets,
    {
      n: 100
    }
  )

  for (let i = 0; i < 3; i++) {
    const [received1, received2] = receivedSmallResults[i]
    const expected = expectedSmallResults[i]
    console.log(received1.time, received2.time)
  }
})

test('compares to old implementation for big samples (performance test)', () => {
  const f1 = (arr1, arr2) => _set(arr1).concat(arr2).values()
  const f2 = (arr1, arr2) => arr1.concat(arr2).reduce((acc, item) => {
    return acc.indexOf(item) === -1
      ? acc.concat(item)
      : acc
  }, [])

  let big1 = []
  let big2 = []
  let big3 = []
  for (let i = 0; i < 10000; i++) {
    big1.push(i + '')
    big2.push(i < 5000 ? i + '' : i + 'a')
    big3.push(i + 'a')
  }

  const bigSets = [
    // 50% common elements
    [ big1, big2 ],
    // no common
    [ big1, big3 ],
    // all common
    [ big1, big1 ]
  ]
  const expectedBigResults = [
    f2(big1, big2),
    f2(big1, big3),
    big1
  ]

  const receivedBigResults = multipleCompare(
    f1,
    f2,
    bigSets,
    {
      n: 100
    }
  )

  for (let i = 0; i < 3; i++) {
    const [received1, received2] = receivedBigResults[i]
    const expected = expectedBigResults[i]
    console.log(received1.time, received2.time)
  }
})
