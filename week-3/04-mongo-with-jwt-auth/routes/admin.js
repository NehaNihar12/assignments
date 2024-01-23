const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;

    try {
        Admin.create({ username, password});
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong"});
    }
    
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  const admin = await Admin.findOne({
    username: username,
    password: password,
  });

  if (!admin) {
    return res.status(411).json({ message: "Incorrect username or password" });
  }
  const token = jwt.sign({ username, type: "admin" }, JWT_SECRET);
  res.status(200).json({ token });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const { title, description, price, imageLink } = req.body;
    const newCourse = await Course.create({
      title,
      description,
      price,
      imageLink,
    });
    try {
      res.status(201).json({
        message: "Course created successfully",
        courseId: newCourse._id,
      });
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wwrong');
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find({})
        res.status(200).json({courses});
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
   
});

module.exports = router;