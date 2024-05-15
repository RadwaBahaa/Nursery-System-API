const mongoose = require('mongoose');
const teacherModel = require('./../Model/teacherModel')

exports.getAllTeachers = (request, response, next) => {
    teacherModel
        .find({})
        .then((data) => {
            console.log('....... GET ALL TEACHERS DATA .......');
            response.status(200).json({ data });
        })
        .catch((error) => {
            next(error)
        });
};

exports.getTeacherByID = (request, response, next) => {
    teacherModel
        .findOne({ _id: new mongoose.Types.ObjectId(request.params.id) })
        .then((data) => {
            if (!data) {
                throw new Error(' ------->>> Teacher is not Exists <<<------- ')
            } else {
                response.status(200).json({ data });
                console.log(`....... GET TEACHER DATA WITH ID: '${request.params.id}' .......`);
            }
        })
        .catch((error) => {
            next(error)
        });
};

exports.getAllSupervisors = (request, response, next) => {
    teacherModel.find({ supervisore: true })
        .then((data) => {
            console.log('....... GET ALL SUPERVISORS DATA .......');
            response.status(200).json({ data });
        })
        .catch((error) => {
            next(error)
        })
};

exports.addTeacher = (request, response, next) => {
    const newTeacher = new teacherModel(request.body);
    newTeacher
        .save()
        .then((data) => {
            console.log('....... ADD TEACHER/S .......');
            response.status(200).json({ data });
        })
        .catch((error) => {
            next(error)
        })
};

exports.updateTeacher = (request, response, next) => {
    teacherModel.findByIdAndUpdate({ _id: request.body._id }, request.body)
        .then((data) => {
            if (!data) {
                throw new Error(' ------->>> Teacher is not Exists <<<------- ')
            } else {
                console.log(`....... TEACHER WITH ID: '${request.body._id}' WAS UPDATED .......`);
                response.status(200).json({ data: [request.body] });
            }
        })
        .catch((error) => {
            next(error)
        })
};

exports.deleteTeacher = (request, response, next) => {
    teacherModel.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(request.params.id) })
        .then((data) => {
            if (!data) {
                throw new Error(' ------->>> Teacher is not Exists <<<------- ')
            } else {
                console.log(`....... TEACHER WITH ID: '${request.body.id}' WAS DELETED .......`);
                response.status(200).json({ massage: 'The teacher was deleted' });
            }
        })
        .catch((error) => {
            next(error)
        })
};

