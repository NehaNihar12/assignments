const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;
  try {
    User.create({ username, password });
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic

  try {
    const courses = await Course.find({});
    res.status(200).json({ courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courdeId = req.params.courseId;
  const { username } = req.headers;

  //   update the user whose username is in header with the courseId
  try {
    await User.updateOne(
      {
        username: username,
      },
      {
        "$push": {
            purchasedCourses: courdeId,
        },
      }
    );

    res.status(200).json({ message: "Purchase completed!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const { username } = req.headers;

  try {

    const user = await User.findOne({ username: username});
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    })

    res.json({courses});
    
  } catch (error) {
    console.error(error);
    res.status(404).json({msg: "No course found"});
  }
});

module.exports = router;
