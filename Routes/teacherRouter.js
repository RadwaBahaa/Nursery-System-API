const express = require('express');
const teacherController = require('../Controller/teacherController');
const { addTeacherValidation, checkId } = require('./../Middleware/teacherValidator');
const validator = require('./../Middleware/validator');

const router = express.Router();

router
    .route("/teachers")
    .get(teacherController.getAllTeachers)
    .post(addTeacherValidation, validator, teacherController.addTeacher)
    .put(addTeacherValidation, validator, teacherController.updateTeacher);
    
router.get("/teachers/supervisors", teacherController.getAllSupervisors);
    
router
    .route("/teachers/:id")
    .get(checkId, validator, teacherController.getTeacherByID)
    .delete(checkId, validator, teacherController.deleteTeacher);

module.exports = router;



