const express = require('express');
const classController = require('./../Controller/classController');
const { addClassValidation, checkId } = require('./../Middleware/classValidator');
const validator = require('./../Middleware/validator');

const router = express.Router()

router
    .route("/class")
    .get(classController.getAllClasses)
    .post(addClassValidation, validator, classController.addClass)
    .put(addClassValidation, validator, classController.updateClass);

router.get("/class/child/:id", checkId, validator, classController.classChildren);

router.get("/class/teacher/:id", checkId, validator, classController.classSupervisor);

router
    .route("/class/:id")
    .get(checkId, validator, classController.getClassByID)
    .delete(checkId, validator, classController.deleteClass);

module.exports = router;



