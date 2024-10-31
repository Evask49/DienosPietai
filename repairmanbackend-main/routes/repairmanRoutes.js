const express = require("express");
const router = express.Router();
const repairmanController = require("../controllers/repairmanController");
const userController = require("../controllers/userController");

router.use(userController.protect); // padaro, kad visi routes butu apsaugoti nuo neprisijungusiu vartotoju
router
    .route("/")
    .get(userController.restrictTo("user", "admin"), repairmanController.getAllRepairmen)
    .post(userController.restrictTo("admin"), repairmanController.createRepairman);

router
    .route("/:id")
    .get(userController.restrictTo("user", "admin"), repairmanController.getRepairmanById)
    .post(userController.restrictTo("user", "admin"), repairmanController.updateLikes)

router
    .route("/update/:id")
    .post(userController.restrictTo("admin"), repairmanController.updateRepairman)


module.exports = router;