const createError = require('http-errors')
const Authors = require('../../models/Authors')
const Quotes = require('../../models/Quotes')

/**
 * Get a single author by ID
 */
module.exports = async function getAuthorById(req, res, next) {
  try {
    const { id } = req.params

    if (!id) {
      return next(createError(422, 'ID is required'))
    }
    // Get the author
    const author = await Authors.findById(id).select('-__v -aka')

    if (!author) {
      return next(createError(404, 'The requested resource could not be found'))
    }
    // Get quotes by this author
    const quotes = await Quotes.find({ authorId: id }).select('-__v -authorId')

    res.status(200).json({ ...author.toJSON(), quotes })
  } catch (error) {
    return next(error)
  }
}
