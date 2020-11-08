const notFound = (req, res, next) => {
  res.status(404)
  const error = new Error("Not found")
  next(error)
}

const errorHandlers = (err, req, res, next) => {
  res.status(500)
  res.json({
    err: err.mesage,
    stack: process.env.NODE_ENV === 'production' ? "" : err.stack
  })
}

module.exports = {
  notFound,
  errorHandlers
}