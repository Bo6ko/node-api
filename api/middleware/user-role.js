function userRole(role) {
    return (req, res, next) => {
        console.log('req.body', req.userData)
        if ( req.userData.role !== role ) {
            //401 you don't have access
            res.status(401);
            return res.send('Not allowed')
        }

        next();
    }
}

module.exports = {
    userRole
}