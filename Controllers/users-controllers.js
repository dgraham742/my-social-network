const { userInfo } = require('os');
const { users } = require('../Models');

const UserController = {
    //get all users
    getAllUsers(req,res) {
        users.find()
        // .populate({
        //     path:'thoughts',
        //     slect:'-__v'
        // })
        .select('-__v')
        // .sort({_id:-1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400)
        });
    },

    //get one user by id
    getUserById({ params}, res) {
        users.findOne({ _id:params.id})
        // .populate('friends')
        // .populate('thoughts')
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        });
    },

    //create user
    createUser({ body},res) {
        users.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    //Update user by ID
    updateUser({ params, body }, res) {
        users.findOneAndUpdate({ _id:params.id},body, {new:true,runValidators:true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User Found with this ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    //delete a user
    deleteUser({ params}, res) {
        users.findOneAndDelete({_id:params.id})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err))
    }
};

module.exports = UserController