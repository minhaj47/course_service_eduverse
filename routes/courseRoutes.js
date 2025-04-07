const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Course Routes
router.post('/create', courseController.createCourse);
router.put('/update/:id', courseController.updateCourse);
router.delete('/delete/:id', courseController.deleteCourse);
router.get('/all', courseController.getAllCourses);
router.get('/get/:id', courseController.getCourseById);
router.get('/getByInstructorId/:id', courseController.getByInstructorId);

module.exports = router;
