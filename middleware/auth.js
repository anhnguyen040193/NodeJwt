const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
    const authorization = req.header('Authorization')
    const token = authorization && authorization.split(' ')[1]
    if (!token) return res.sendStatus(401)
    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN)
        req.userId = decode.id
        console.log('req.userId', req.userId);
        next()
    } catch (error) {
        console.log('error', error);
        res.sendStatus(403)
    }
}

module.exports = verify