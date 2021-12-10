
const { User } = require('../models/userSchema')


const create = (req, res) => {
    // Validate request
    console.log(req.body.length>1)
    if(req.body.length < 1) {
        return res.status(400).send({
            message: "Content can not be empty"
        });
    }

    // Create
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        country: req.body.country
    });

    // Save
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
}

const readAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
}

const readSingle = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        });
    }

    User.findById(req.params.userId)
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
}

const update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        });
    }

    // Find and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name,
        email: req.body.email,
        country: req.body.country
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating User with id " + req.params.userId
        });
    });
}

const remove = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
}



module.exports = { create, readAll, readSingle, update, remove }