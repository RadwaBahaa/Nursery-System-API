//Requires
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const teacherRouter = require('./Routes/teacherRouter');
const childRouter = require('./Routes/childRouter');
const classRouter = require('./Routes/classRouter');

const app = express();
const port = process.env.PORT || 8080;

mongoose
    .connect("mongodb://127.0.0.1:27017/NurserySystem")
    .then(() => {
        console.log('Start running server ......................' + 27017);
        app.listen(port, () => {
            console.log('Start running server ......................' + port);
        });
    })
    .catch((error) => {
        console.log("Error in DB" + error)
    });


app.use(morgan('dev'));
app.use(cors());

//A middleware function that is used to parse JSON data sent in the request body
app.use(express.json());

//Routes(EndPoints)
app.use(teacherRouter);
app.use(childRouter);
app.use(classRouter);

//General middleware for not Found url pathes with 404 status code.
app.use((request, response) => {
    response.status(404).json({ message: 'Not Found' })
});

//One Error handling middleware that will catch all system Errors with 500 status code.
app.use((error, request, response, next) => {
    response.status(500).json({ message: 'There is somthing wrong.....' + error });
});
    


