const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all courses taught by an instructor
exports.getInstructorCourses = async (req, res) => {
  const { instructorId } = req.params;

  try {
    const courses = await prisma.course.findMany({
      where: { instructorId },
      include: {
        outcomes: true,
        lessons: true,
        enrollments: true,
      },
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch instructor courses', details: error.message });
  }
};

// Get all courses a student is enrolled in
exports.getStudentCourses = async (req, res) => {
  const { studentId } = req.params;

  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      include: {
        course: {
          include: {
            outcomes: true,
            lessons: true,
          },
        },
      },
    });

    const courses = enrollments.map((enrollment) => enrollment.course);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student courses', details: error.message });
  }
};
