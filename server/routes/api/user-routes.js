const router = require("express").Router();
const {
  createUser,
  getSingleUser,
  login,
  addApiary,
  deleteApiary,
} = require("../../controllers/user-controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

// put authMiddleware anywhere we need to send a token for verification of user
router.route("/").post(createUser).put(authMiddleware, addApiary);

router.route("/login").post(login);

router.route("/me").get(authMiddleware, getSingleUser);

router.route("/apiary/:apiaryId").delete(authMiddleware, deleteApiary);

module.exports = router;