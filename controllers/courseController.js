const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Create a new course
  createCourse: async (req, res) => {
    try {
      const { title, description, price, coverPhotoUrl, level, instructorId } = req.body;
      const newCourse = await prisma.course.create({
        data: {
          title,
          description,
          price,
          coverPhotoUrl,
          level,
          instructorId
        }
      });
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(500).json({ message: 'Error creating course', error });
    }
  },

  // Update a course
  updateCourse: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, price, coverPhotoUrl, level } = req.body;
      const updatedCourse = await prisma.course.update({
        where: { id: Number(id) },
        data: { title, description, price, coverPhotoUrl, level }
      });
      res.json(updatedCourse);
    } catch (error) {
      res.status(500).json({ message: 'Error updating course', error });
    }
  },

  // Delete a course
  deleteCourse: async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.course.delete({
        where: { id: Number(id) }
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting course', error });
    }
  },

  // Get all courses
  getAllCourses: async (req, res) => {
    try {
      const courses = await prisma.course.findMany();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching courses', error });
    }
  },

  // Get a specific course by ID
  getCourseById: async (req, res) => {
    try {
      const { id } = req.params;
      const course = await prisma.course.findUnique({
        where: { id: Number(id) }
      });
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching course', error });
    }
  }
};
