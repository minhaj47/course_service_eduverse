const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Search courses by title or description (basic text search)
exports.searchCourses = async (req, res) => {
  const { query } = req.query;

  try {
    const courses = await prisma.course.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } }
        ]
      }
    });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Search failed', details: error.message });
  }
};


exports.filterCourses = async (req, res) => {
    const {
      level,
      minPrice,
      maxPrice,
      instructorId,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;
  
    try {
      const filters = {
        AND: [
          level ? { level: level.toUpperCase() } : {},
          minPrice ? { price: { gte: parseFloat(minPrice) } } : {},
          maxPrice ? { price: { lte: parseFloat(maxPrice) } } : {},
          instructorId ? { instructorId: instructorId } : {}
        ]
      };
  
      const courses = await prisma.course.findMany({
        where: filters,
        orderBy: {
          [sortBy]: sortOrder === 'asc' ? 'asc' : 'desc'
        }
      });
  
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Filtering failed', details: error.message });
    }
};

//  Example Queries

// /courses/filter?level=BEGINNER&sortBy=price&sortOrder=asc

// /courses/filter?minPrice=0&maxPrice=200

// /courses/filter?instructorId=abc123&sortBy=createdAt