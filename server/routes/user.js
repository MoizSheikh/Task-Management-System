const router = require("express").Router();

const User = require("./../models/user");
const { route } = require("./task");
console.log("above signup");
router.post("/signup", (req, res) => {
    console.log("here woww")
  const newuser = new User(req.body);
  if (newuser.password != newuser.password2)
    return res
      .status(201)
      .json({ message: "Password not match", success: false });

  User.findOne({ email: req.body.email }, (err, user) => {
    if (user)
      return res
        .status(201)
        .json({ auth: false, message: "Email Already Exits", success: false });
    newuser.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false, error: err });
      }

      res.status(200).json({
        success: true,
        message: "User created successfully!\nPlease Login to continue",
        user: doc,
      });
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to Login", success: false });
    }

    if (!user) {
      return res.status(201).json({
        message: "Invalid Email",
        success: false,
      });
    }
    if (user.password !== req.body.password) {
      return res.status(201).json({
        message: "Invalid Password",
        success: false,
      });
    }

    return res.status(200).json({
      userData: user,
      success: true,
      message: "Login Successful",
    });
  });
});

router.get("/getAll", ({}, res) => {
  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/get/:id", (req, res) => {
  User.findOne({ _id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to get ", success: false });
    }

    res.status(200).json({
      success: true,
      data: obj,
    });
  });
});

router.delete("/delete/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }, (err, obj) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Failed to delete", success: false, err: err });
    }
    res.status(200).json({
      success: true,
      data: obj,
      message: "User Deleted succesfully",
    });
  });
});

router.get("/admin", (req, res) => {
  User.findOne({ is_admin: true }, (err, obj) => {
    res.status(200).json(obj);
  });
});

module.exports = router;
