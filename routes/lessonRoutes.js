const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.post('/add/:courseId', lessonController.addLesson);
router.get('/get/:courseId', lessonController.getCourseLessons);
router.put('/update/:lessonId', lessonController.updateLesson);
router.delete('/delete/:lessonId', lessonController.deleteLesson);

module.exports = router;