const { generateArrays, times: { TIME_1M }, types: { TYPE_1M } } = require('../_internal/helpers/performance')

module.exports = function() {
  const [small, medium, big] = generateArrays(TIME_1M, () => 1)

  return {
    type: TYPE_1M,
    argss: [
      [small.length / 2, small],
      [medium.length / 2, medium],
      [big.length / 2, big]
    ]
  }
}
