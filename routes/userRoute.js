const router = require("express").Router();
const { logout, getCompanyInfo, getAllUser, updatProfile, deleteUser, getMyProfile } = require("../controller/user");
const { login } = require("../controller/user");
const { register } = require("../controller/user");
const { isAuthenticated } = require("../middleware/auth");

router.post("/register",register);
router.get("/me",isAuthenticated, getMyProfile);
router.post("/login",login);
router.get("/logout",isAuthenticated,logout);
router.get("/getinfo",isAuthenticated,getCompanyInfo);
router.get("/getalluser",isAuthenticated,getAllUser);
router.post("/user/update/:id",isAuthenticated,updatProfile);
router.delete("/user/:id",isAuthenticated,deleteUser);
// router.get("/getdata",isAuthenticated,getData);
module.exports = router;