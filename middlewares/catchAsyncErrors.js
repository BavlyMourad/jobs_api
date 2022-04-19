// 10th File

// To test it remove: remove title from creating new job
module.exports = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next)
}
