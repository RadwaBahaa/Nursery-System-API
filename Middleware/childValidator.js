const { query, param, body } = require("express-validator");

exports.addChildValidation = [
    body('_id')
        .isNumeric()
        .withMessage('_id must be a number'),
  
    body('fullName')
        .notEmpty()
        .isString()
        .withMessage('Full name is required'),
  
    body('age')
        .isInt({ min: 0, max: 10 })
        .withMessage('Age must be a non-negative integer between 0 and 10 years'),
  
    body('level')
        .isIn(['PreKG', 'KG1', 'KG2'])
        .withMessage('Level must be PreKG, KG1, or KG2'),
  
    body('address')
        // .nested()
        .notEmpty()
        .withMessage('Address is required')
        .bail() // Stop validation if address is empty
        .custom((address) => {
            if (!address.city || !address.street || !address.building) {
                throw new Error('City, street, and building are required in the address');
            }
            return true;
        }),
];

exports.checkId = [
    param('id').isNumeric().withMessage('Child ID should be Number')
];