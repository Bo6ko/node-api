const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const { userRole } = require('../middleware/user-role')

const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        // set name of file
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
        cb(new Error('File not stored'), true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    // fileFilter: fileFilter
});

router.get('/', checkAuth, ProductsController.getAllByUserId);

router.post('/', checkAuth, upload.single('file'), ProductsController.create);

router.get('/:id', checkAuth, ProductsController.getById);

router.put('/', checkAuth, upload.single('file'), ProductsController.update);

router.delete('/:id', checkAuth, ProductsController.delete);

module.exports = router;