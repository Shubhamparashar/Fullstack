const db = require("./connection");
const createRequest = function (mappingObj) {
    return new Promise(function (resolve, reject) {
        db.query('INSERT INTO user_follower SET ?', mappingObj, function (err, result) {
            // Neat!
            if (err) {
                reject(err)
            } else {
                resolve(mappingObj);
            }
        });
    })
}
const accpectRequest = function (user_id, follower_id) {
    return new Promise(function (resolve, reject) {
        db.query(`UPDATE user_follower SET is_pending=0 WHERE user_id="${user_id}" AND follower_id="${follower_id}"`, function (err, result) {
            // Neat!
            if (err) {
                reject(err)
            } else {
                resolve(mappingObj);
            }
        });
    })
}
const rejectRequest = function (user_id, follower_id) {
    return new Promise(function (resolve, reject) {
        db.query(`DELETE from user_follower WHERE user_id="${user_id}" AND follower_id="${follower_id}" AND is_pending=1`, function (err, result) {
            // Neat!
            if (err) {
                reject(err)
            } else {
                resolve(mappingObj);
            }
        });
    })
}
module.exports.createRequest = createRequest;
module.exports.accpectRequest  = accpectRequest;
module.exports.rejectRequest =  rejectRequest;