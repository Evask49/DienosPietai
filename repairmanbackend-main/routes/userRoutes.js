const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);

router
    .use(userController.protect)
    .route("/:id")
    .patch(userController.restrictTo("user"), userController.updateUser)
module.exports = router;