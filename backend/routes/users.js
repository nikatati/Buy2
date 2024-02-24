//in experss router is resposible for creating/storing/importing/exporting the API'S
const { User } = require("../models/user"); //returning an object
const experss = require("express");
const router = experss.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//An get command to list of useresfrom the DB
router.get(`/`, async (req, res) => {
  const userList = await User.find().select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

// A GET command from the DB of a specific user
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log("Invalid ID format.");
    }
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log("Valid ID format.");
    }
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) {
      return res
        .status(500)
        .json({ message: "The user with the given ID was not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    color: req.body.color,
    passwordHash: bcrypt.hashSync(req.body.password, 10), //The password isnot desplayd- its $2a$10$8yZ....
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  user = await user.save();

  if (!user) return res.status(400).send("the user cannot be created!");

  res.send(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;
  if (!user) {
    return res.status(400).send("user not found");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "1d" }
    );

    res.status(200).send({ user: user.email, token: token });
  } else {
    res.status(400).send("password is wrong!");
  }
});

module.exports = router;
