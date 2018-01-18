module.exports = function rangeFrom1(n) {
  var a = Array.from({ length: n }, (v, k) => k + 1)
  return a
}
