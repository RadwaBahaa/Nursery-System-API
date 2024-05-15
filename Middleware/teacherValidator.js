const { query, param, body } = require("express-validator");

exports.addTeacherValidation = [
    body('_id')
        .isMongoId()
        .optional()
        .withMessage('Teacher ID should be Object'),

    body('fullname')
        .notEmpty()
        .isString()
        .withMessage('Full name is required'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    body('image')
        .optional()
        .isString()
        .withMessage('Image URL is invalid'),

    body('role')
        .isIn(['teacher', 'admin'])
        .withMessage('Role must be teacher or admin'),

    body('supervisor')
        .isString()
        .optional()
        .withMessage('Supervisor must be an Object ID'),

    body('email')
        .isEmail()
        .optional()
        .withMessage('Email is invalid'),
];

exports.checkId = [
    param('id').isMongoId().withMessage('Teacher ID should be Object')
];