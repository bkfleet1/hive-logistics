const router = require("express").Router();
const {
  createUser,
  getSingleUser,
  //apiary,
  login,
} = require("../../controllers/user-controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

// put authMiddleware anywhere we need to send a token for verification of user
//router.route("/").post(createUser).put(authMiddleware, apiary);
router.route("/createUser").post(createUser);
router.route("/login").post(login);

router.route("/me").get(authMiddleware, getSingleUser);

module.exports = router;
