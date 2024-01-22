const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body;

    // check if user already exists
    try {
        await Admin.create({username,password});
        res.status(200).json({msg:'Admin created successfully'});

    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Something went wrong'});
    }
    
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  // do zod validation 1st
  const { title, description, imageLink, price } = req.body;

  try {

    const newCourse = await Course.create({ title, description, imageLink, price });
    res.status(200).json({ msg: "Course created successfully", courseId: newCourse._id });

  } catch (error) {

    console.error(error);
    res.status(500).json({msg:'Something went wrong'});

  }

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find({});
        res.status(200).json({ courses});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Something went wrong'});

    }
});

module.exports = router;