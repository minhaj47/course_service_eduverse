const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/add/:lessonId', quizController.createQuiz);
router.get('/get/:lessonId', quizController.getLessonQuiz);
router.post('/add/:quizId/questions', quizController.createQuestion);
router.get('/get/:quizId/questions', quizController.getQuizQuestions);
router.put('/update/:questionId', quizController.updateQuestion);
router.delete('/delete/:questionId', quizController.deleteQuestion);

module.exports = router;