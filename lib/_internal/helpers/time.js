import { performance } from 'perf_hooks'

function execute(f, args, n) {
  var time = 0
  var results = []
  for (var i = 0; i < n; i++) {
    var start = performance.now()
    var newResult = f.apply(f, args)
    var end = performance.now()
    time += end - start
    results.push(newResult)
  }
  return {
    results: results,
    time: time / n 
  }
}

export function compare(f1, f2, args, options) {
  options = options || {}
  options.n = options.n || 100
  var executed1 = execute(f1, args, options.n)
  var executed2 = execute(f2, args, options.n)
  return [executed1, executed2]
}

export function multipleCompare(f1, f2, argss, options) {
  var times = []
  for (var args of argss) {
    times.push(compare(f1, f2, args, options))
  }
  return times
}