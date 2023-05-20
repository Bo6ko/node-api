
const Product = require('../models/product');

exports.can_view_project = (user, project) => {

    return (
        user.role === User.role ||
        project.userId === user.id
    )
}

exports.scoped_projets = (req, res, next) => {

    console.log('req.body', req.userData)

    if ( req.userData.role === 'admin' ) return true;
    // return projects.filter(project => project.userId === user.id) 
    next();
}