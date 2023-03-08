const userModel = require("../models/user.model");

exports.getCustomer = async function (req, res, next) {
    console.log("hello")
}

exports.createUser = async function (req, res, next) {
    try {
        var userObj = {
            name: req.body.name,
            password: req.body.password
        };
        const user = new userModel(userObj);

        // Save the user to MongoDB
        user.save()
            .then((user) => {
                res.status(200).json({
                    "success": true,
                    "data": user,
                    "message": "created successfully"
                })
            })
            .catch(error => {
                res.status(403).json({
                    "success": false,
                    "data": error,
                })
            });
      
    }
    catch (err) {
        res.status(500).json({
            "success": false,
            "data": err,
        });
    }
}