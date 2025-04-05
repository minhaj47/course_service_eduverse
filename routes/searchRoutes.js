const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/courses/search', searchController.searchCourses);
router.get('/courses/filter', searchController.filterCourses);

module.exports = router;