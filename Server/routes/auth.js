const router = require("express").Router();
const { handleAuth } = require("../controllers/auth");

router.post("/", handleAuth);

module.exports = router;