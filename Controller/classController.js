const classModel = require('./../Model/classModel');

exports.getAllClasses = (request, response, next) => {
    classModel.find({})
        .then((data) => {
            console.log('....... GET ALL CLASSES DATA .......');
            response.status(200).json({ data });
        })
        .catch((error) => {
            next(error);
        });
};

exports.getClassByID = (request, response, next) => {
    classModel.findOne({ _id: request.params.id })
        .then((data) => {
            if (!data) {
                throw new Error(' ------->>> Class is not Exists <<<------- ');
            } else {
                console.log(`....... GET CLASS DATA WITH ID:'${request.params._id}' .......`);
                response.status(200).json({ data });
            };
        })
        .catch((error) => {
            next(error);
        });
};

exports.addClass = (request, response, next) => {
    const newClass = new classModel(request.body);

    newClass.populate([
        { path: 'supervisor' },
        { path: 'children' },
    ])
        .then((populatedClass) => {
            if (!populatedClass.supervisor || !populatedClass.children.length) {
                throw new Error('Invalid supervisor or children IDs');
            } else {
                newClass.save();
                console.log('....... ADD NEW CLASS .......');
                response.status(200).json({ data: newClass });
            }
        })
        .catch((error) => {
            next(error + 'Controller error');
        });
};

exports.updateClass = (request, response, next) => {
    classModel.findByIdAndUpdate({ _id: request.body._id }, request.body) // Update and return updated document
        .populate([
            { path: 'supervisor' },
            { path: 'children' },
        ])
        .then((updatedClass) => {
            if (!updatedClass) {
                throw new Error(' ------->>> Class is not Exists <<<------- ');
            } else if (!updatedClass.supervisor || !updatedClass.children.length) {
                throw new Error('Invalid supervisor or children IDs');
            }
            console.log('....... Class updated .......');
            response.status(200).json({ data: request.body });
        })
        .catch((error) => {
            next(error);
        });
};

exports.deleteClass = (request, response, next) => {
    classModel.findByIdAndDelete({ _id: request.params.id })
        .then((data) => {
            if (!data) {
                throw new Error(' ------->>> Class is not Exists <<<------- ');
            }
            console.log(`....... CLASS WITH ID:'${request.params.id}' WAS DELETED .......`);
            response.status(200).json({ massage: 'CLASS was deleted' });
        })
        .catch((error) => {
            next(error);
        });
};

exports.classChildren = (request, response, next) => {
    classModel.find({ _id: request.params.id })
        .populate({ path: "children", select: { fullName: 1 } })
        .then((data) => {
            if (!data) {
                throw new Error(' ------->>> Class is not Exists <<<------- ');
            } else {
                console.log('....... CHILDREN CLASS INFO .......');
                response.status(200).json({ data });
            };
        })
        .catch((error) => {
            next(error)
        });
};

exports.classSupervisor = (request, response, next) => {
    classModel.find({ _id: request.params.id })
        .populate({ path: "supervisor", select: { fullname: 1 } })
        .then((data) => {
            if (!data) {
                throw new Error(' ------->>> Class is not Exists <<<------- ');
            } else {
                console.log('....... SUPERVISOR CLASS INFO .......');
                response.status(200).json({ data });
            };
        })
        .catch((error) => {
            next(error)
        });
};