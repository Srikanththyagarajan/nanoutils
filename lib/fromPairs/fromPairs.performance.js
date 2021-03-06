const { generateArrays, times: { TIME_1M }, types: { TYPE_1M } } = require('../_internal/helpers/performance')

module.exports = function getPairsList() {
  const [big1, big2, big3] = generateArrays(TIME_1M, i => [i, 'a'])

  return {
    type: TYPE_1M,
    argss: [
      [big1],
      [big2],
      [big3]
    ]
  }
}
