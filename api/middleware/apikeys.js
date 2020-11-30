const validateKey = (req, res, next) => {
    let host = req.headers.origin
    let api_key = req.header('APIKey')
    if (api_key == "test" ) {
        next()
    } else {
        // res.status(403).send({ error: { code: 403, message: 'You not allowed.' } });
    }
}
module.exports = validateKey
