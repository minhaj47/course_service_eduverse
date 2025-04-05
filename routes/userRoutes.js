const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/studentProfile/:studentId', userController.getStudentProfile);
router.get('/instructorProfile/:instructorId', userController.getInstructorProfile);
router.get('/instructorCourses/:instructorId', userController.getInstructorCourses);
router.get('/courses/:studentId', userController.getStudentCourses);


module.exports = router;