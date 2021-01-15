const { Router } = require("express");
const {
	signup_get,
	login_get,
	signup_post,
	login_post,
	login_out,
} = require("../controllers/authController");

const router = Router();

router.get("/signup", signup_get);
router.get("/login", login_get);
router.get("/logout", login_out);
router.post("/signup", signup_post);
router.post("/login", login_post);
module.exports = router;
