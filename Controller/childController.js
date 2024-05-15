const childModel = require('./../Model/childModel');

exports.getAllChildren = (request, response, next) => {
    childModel.find({})
        .then((data) => {
            console.log('....... GET ALL CHILDREN DATA .......');
            response.status(200).json({ data });
        })
        .catch((error) => {
            next(error);
        });
};

exports.getChildByID = (request, response, next) => {
    childModel.findOne({ _id: request.params.id })
        .then((data) => {
            if (!data) {
                throw new Error(' ------->>> Child is not Exists <<<------- ');
            } else {
                console.log(`....... GET CHILD DATA WITH ID:'${request.params.id}' .......`);
                response.status(200).json({ data });
            }
        })
        .catch((error) => {
            next(error);
        });
};

exports.addChild = (request, response, next) => {
    const newChild = new childModel(request.body);
    newChild
        .save()
        .then((data) => {
            console.log('....... ADD NEW CHILD .......');
            response.status(200).json({ data });
        })
        .catch((error) => {
            next(error)
        });
};

exports.updateChild = (request, response, next) => {
    childModel.findByIdAndUpdate({ _id: request.body._id }, request.body)
        .then((data) => {
            if (!data) {
                throw new Error(' ------->>> Child is not Exists <<<------- ');
            } else {
                console.log(`....... CHILD WITH ID:'${request.body._id}' WAS UPDATED .......`);
                response.status(200).json({ data: [request.body] });
            }
        })
        .catch((error) => {
            next(error)
        });
};

exports.deleteChild = (request, response, next) => {
    childModel.findByIdAndDelete({ _id: request.params.id })
        .then((data) => {
            if (!data) {
                throw new Error(' ------->>> Child is not Exists <<<------- ');
            } else {
                console.log(`....... CHILD WITH ID:'${request.params.id}' WAS DELETED .......`);
                response.status(200).json({ massage: 'The child was dalated' });
            }
        })
        .catch((error) => {
            next(error)
        })
};

