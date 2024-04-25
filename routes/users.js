var express = require('express');
var router = express.Router();
const { updateUser, deleteUser, getUser, getUsers } = require('../controllers/user.js');
const {verifyUser, verifyAdmin} = require("../routes/utils/verifyToken.js")


/* router.get('/checkauthentication', verifyToken, (req,res,next) =>{
  res.send("Hello user, you are logged in!")
})

router.get("/checkuser/:id", verifyUser, (req, res, next) =>{
  res.send("Hello user, you are logged in and you can delete your account");
})

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) =>{
  res.send("Hello admin, you are logged in and you can delete all accounts");
}) */

// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE

router.delete("/:id", verifyUser, deleteUser);


//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

module.exports = router;
