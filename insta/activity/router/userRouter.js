const express=require("express");
const userRouter = new express.Router();
let { createUser, updateUser, deleteUser, getUser ,getAllUser} = require("../controller/userController");
// user routes
// /:user_id
// read  => GET ONE 
// localhost:3000/api/v1/users/dsgkbfds
userRouter.route("/").post(createUser).get(getAllUser)
userRouter.route("/:user_id").get(getUser).patch(updateUser).delete(deleteUser);
module.exports = userRouter