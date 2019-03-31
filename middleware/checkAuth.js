import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const decodedToken = jwt.verify(token, "SUPER_SECRET");
        req.userData = decodedToken
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed"
        })
    }
}