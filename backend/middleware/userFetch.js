const jwt = require('jsonwebtoken');
const JWT_SECRET = "AshishNexWillRuleTheWorld"

const userFetch = (req,res,next)=>{
    // get the user from the jwt token and add ID to req project
    const token = req.header('authToken')
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
}

module.exports = userFetch;