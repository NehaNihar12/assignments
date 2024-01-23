const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { JWT_SECRET } = require("../config");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const { username, password } = req.body;
    try {
        const doesExist = await User.findOne({ username});
        if(doesExist){
            return res.status(409).send('User already exists');
        }
        User.create({ username: username, password: password});
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signin logic
    const { username, password } = req.body;

    const user = await User.findOne({ username,password});
    if(!user){
        return res.status(411).send('Incorrect username or password');
    }
    const token = jwt.sign({username, type:"user"},JWT_SECRET);
    res.status(200).json({token});

});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic

  const courses = await Course.find({ published: true });
  res.status(200).json({ courses });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    try {
      await User.updateOne(
        {
          username: req.username,
        },
        {
          $push: {
            purchasedCourses: courseId,
          },
        }
      );
      res.status(200).json({ message: 'Course purchased successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('something went wrong');
    }
    

});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    try {
        const user = await User.findOne({ username: req.username});
        const courses = await Course.find({
            _id:{$in: user.purchasedCourses}
        });
        res.status(200).json({ courses });
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router