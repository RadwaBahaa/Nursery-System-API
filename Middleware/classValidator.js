const { query, param, body } = require("express-validator");

exports.addClassValidation = [
    body('_id')
        .isNumeric()
        .withMessage('_id must be a number'),

    body('name')
        .notEmpty()
        .withMessage('Name is required'),

    body('supervisor')
        .isMongoId()
        .withMessage('Supervisor must be an Object ID'),

    body('children')
        .isArray()
        .notEmpty()
        .withMessage('Children array must be an array'),
];

exports.checkId = [
    param('id').isNumeric().withMessage('Class ID should be Object')
];