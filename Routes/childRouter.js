const express = require('express');
const childController = require('./../Controller/childController');
const { addChildValidation, checkId } = require('./../Middleware/childValidator');
const validator = require('./../Middleware/validator');

const router = express.Router();

router
    .route("/child")
    .get(childController.getAllChildren)
    .post(addChildValidation, validator, childController.addChild)
    .put(addChildValidation, validator, childController.updateChild);
    
router
    .route("/child/:id")
    .get(checkId, validator, childController.getChildByID)
    .delete(checkId, validator, childController.deleteChild);

module.exports = router;



