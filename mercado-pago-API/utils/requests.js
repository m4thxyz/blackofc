const request = require("request")

async function requests(opts) {
  return new Promise(
    (resolve, reject) => {
      opts.rejectUnauthorized = false;
      request(opts, (err, res, body) => {
        resolve(
          { res, body }
        )
      })
    }
  )
}

module.exports = { requests }
