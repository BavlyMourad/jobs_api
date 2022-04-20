// 11th File

class APIFilters {
  constructor(query, queryStr) {
    this.query = query
    this.queryStr = queryStr
  }

  filter() {
    const queryCopy = { ...this.queryStr }

    // Removing fields from the query
    const removeFields = ["sort", "fields", "q", "limit", "page"]
    removeFields.forEach((element) => delete queryCopy[element])

    // Advanced filter using: lt, lte, gt, gte
    let queryStr = JSON.stringify(queryCopy)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    )
    //console.log(queryStr)

    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }

  sort() {
    // If sort exists in the query string
    if (this.queryStr.sort) {
      // split when it sees comma, join change array to string
      const sortBy = this.queryStr.sort.split(",").join(" ")
      console.log(sortBy)
      this.query = this.query.sort(sortBy)
    } else {
      // sort job for the latest job posted using - (descending order)
      this.query = this.query.sort("-postingDate")
    }

    return this
  }

  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ")
      // select() is a mongo method that select particular field
      this.query = this.query.select(fields)
    } else {
      // remove the __v field using -
      this.query = this.query.select("-__v")
    }

    return this
  }

  searchByQuery() {
    if (this.queryStr.q) {
      const qu = this.queryStr.q.split("-").join(" ")
      this.query = this.query.find({ $text: { $search: '"' + qu + '"' } })
    }

    return this
  }

  pagination() {
    // base 10 is for decimals, 2 for binary 8 for octal, 16 for hexa
    const page = parseInt(this.queryStr.page, 10) || 1
    const limit = parseInt(this.queryStr.limit, 10) || 10

    // page = 5, limit = 20 -> (5 - 1) * 20 = 80, will skip 80 results
    const skipResults = (page - 1) * limit

    // mongoose methods
    this.query = this.query.skip(skipResults).limit(limit)

    return this
  }
}

module.exports = APIFilters
