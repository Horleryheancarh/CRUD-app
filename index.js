__author__ = 'Horleryheancarh'

// Imports
const express = require('express')
const mongoose = require('mongoose')

// Presets
const app = express()
app.use(
    express.urlencoded({ extended: true }),
    express.json()
)

// DB Presets
// connecting to DB
mongoose.connect('mongodb+srv://testuser:testp@ss@crud-users.sx0vd.mongodb.net/cruduser', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to db successfully')
}).catch(err => {
    console.log(err, 'Could not connect to db. Exiting now...')
    process.exit();
})

// Define Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    country: String
}, {
    timestamp: true
});
const User =  mongoose.model('User', UserSchema)

// Routes
app.get('/', (req, res) => {
    res.json({message: 'Welcome to my CRUD app'})
})

// Create User
app.post('/api', (req, res) => {
    // Validate request
    if(!req.body) {
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

    console.log(user)

    // Save
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
});

// Retrieve All User
app.get('/api', (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
});

// Retrieve Single User
app.get('/api/:userId', (req, res) => {
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
});

// Update
app.put('/api/:userId', (req, res) => {
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
                message: "Note not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.userId
        });
    });
});

// Delete
app.delete('/api/:userId', (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.userId
        });
    });
});

// Server
app.listen(3000, () => console.log('Server listening on port 3000......'))
