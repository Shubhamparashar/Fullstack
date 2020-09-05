// npm init -y 
// npm i express
//  npm i nodemon --save-dev
// create start script int Package.json=>  "start":"nodemon crud/api.js"
// in pkg.json dir => npm start
const express = require("express");
const app = express();
const userDB = require("./user.json");
const fs = require("fs");
const path = require("path");
const { create } = require("domain");
const { get } = require("http");
// REST API
// HTTP request => 
// create => POST
// http packet => body 
app.use(function(req, res, next){
    console.log(req.body);
    next();
})
app.use(express.json());

app.use(function(req, res, next){
    // console.log(req);
    next();
})
const userRouter = new express.Router();
const postRouter = new express.Router();
app.use("/api/users", userRouter);
app.use("/api/post", postRouter);

userRouter.post("/", createUser);
postRouter.post("/", createPost);

userRouter.route("/:user_id").get(getUser).patch(updateUser).delete(deleteUser);
// postRouter.route("/:post_id").get(postUser).patch(updatePost).delete(deletePost);

// ****************************users********************
// user Route Handlers
function createUser(req, res) {
    let user = req.body;
    // db Save
    // console.log(user);
    // if a new entry is created on server
    // memory -> ram
    userDB.push(user);
    fs.writeFileSync(path.join(__dirname,
        "user.json"),
        JSON.stringify(userDB));
    //    res status code server send 
    res.status(201).json({
        success: "successfull",
        user: user
    })
}
function getUser(req, res) {
    let { user_id } = req.params;
    let user;
    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].user_id == user_id) {
            user = userDB[i];
        }
    }
    if (user == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }

    res.status(200).json({
        status: "success",
        user: user
    })
}
function updateUser(req, res) {
    let { user_id } = req.params;
    // {user_id:12345}
    let user;
    let toUpdate = req.body;
    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].user_id == user_id) {
            user = userDB[i];
        }
    }

    if (user == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }
    // update
    for (let key in toUpdate) {
        user[key] = toUpdate[key];
    }
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));
    // update 
    res.status(200).json({
        status: "success",
        "message": "message"
    })

}
function deleteUser(req, res) {
    let { user_id } = req.params;
    // {user_id:12345}
    let initialUserL = userDB.length;
    userDB = userDB.filter(function (user) {
        return user.user_id != user_id;
    })
    if (initialUserL == userDB.length) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));

    res.status(200).json({
        status: "success",
        "message": "user deleted"
    })
}
// POST Route handlers
function createPost(req, res) {
    let user = req.body;
    // db Save
    // console.log(user);
    // if a new entry is created on server
    // memory -> ram
    userDB.push(user);
    fs.writeFileSync(path.join(__dirname,
        "user.json"),
        JSON.stringify(userDB));
    //    res status code server send 
    res.status(201).json({
        success: "successfull",
        user: user
    })
}
function getPost(req, res) {
    let { user_id } = req.params;
    let user;
    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].user_id == user_id) {
            user = userDB[i];
        }
    }
    if (user == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }

    res.status(200).json({
        status: "success",
        user: user
    })
}
function updatePost(req, res) {
    let { user_id } = req.params;
    // {user_id:12345}
    let user;
    let toUpdate = req.body;
    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].user_id == user_id) {
            user = userDB[i];
        }
    }

    if (user == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }
    // update
    for (let key in toUpdate) {
        user[key] = toUpdate[key];
    }
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));
    // update 
    res.status(200).json({
        status: "success",
        "message": "message"
    })

}
function deletePost(req, res) {
    let { user_id } = req.params;
    // {user_id:12345}
    let initialUserL = userDB.length;
    userDB = userDB.filter(function (user) {
        return user.user_id != user_id;
    })
    if (initialUserL == userDB.length) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));

    res.status(200).json({
        status: "success",
        "message": "user deleted"
    })
}

// handler req.body 
// app.post("/api/users", function (req, res) {
//     let user = req.body;
//     // db Save
//     // console.log(user);
//     // if a new entry is created on server
//     // memory -> ram
//     userDB.push(user);
//     fs.writeFileSync(path.join(__dirname, 
//         "user.json"),
//         JSON.stringify(userDB));
//     //    res status code server send 
//     res.status(201).json({
//         success: "successfull",
//         user: user
//     })
// })

// // read  => GET ONE 
// app.get("/api/users/:user_id", function (req, res) {
//     let { user_id } = req.params;
//     let user;
//     for (let i = 0; i < userDB.length; i++) {
//         if (userDB[i].user_id == user_id) {
//             user = userDB[i];
//         }
//     }
//     if (user == undefined) {
//         return res.status(404).json({
//             status: "failure",
//             message: "user not found"
//         })
//     }
//     res.status(200).json({
//         status: "success",
//         user: user 
//     })
// })
// // update => PATCH
// // client will your id in url and data to update in req.body
// // api/users/12345
// app.patch("/api/users/:user_id", function (req, res) {
//     let { user_id } = req.params;
//     // {user_id:12345}
//     let user;
//     let toUpdate=req.body;
//     for (let i = 0; i < userDB.length; i++) {
//         if (userDB[i].user_id == user_id) {
//             user = userDB[i];
//         }
//     }
//     for(let key in toUpdate){
//         user[key] = toUpdate[key];
//     }
//     if (user == undefined) {
//         return res.status(404).json({
//             status: "failure",
//             message: "user not found"
//         })
//     }
//     fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));
//     // update 
//     res.status(200).json({
//         status: "success",
//         user: user 
//     })
// })
// // search and delete 
// app.delete("/api/users/:user_id", function (req, res) {
// let {user_id} = req.params;
// let initialUserL = userDB.length;
// userDB = userDB.filter(function(user){
//     return user.user_id!= user_id;
// })
// if(initialUserL== userDB.length){
//     return res.status(404).json({
//         status: "failure",
//         message: "user not found"
//     })
// }
// fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));
// res.status(200).json({
//     status: "success",
//     "message": "user deleted"
// })
// })
// delete=> DELETE 
// localhost:3000/api/users
app.listen(3000, function () {
    console.log("Server is listening at port 3000");
})