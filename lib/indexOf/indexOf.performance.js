const { generateArrays, times: { TIME_1M }, types: { TYPE_1M } } = require('../_internal/helpers/performance')

module.exports = function() {
  const [small, medium, big] = generateArrays(TIME_1M, x => x)

  return {
    type: TYPE_1M,
    argss: [
      [small[small.length / 2], small],
      [medium[medium.length / 2], medium],
      [big[big.length / 2], big]
    ]
  }
}
