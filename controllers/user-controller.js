const { User } = require('../models');

const userController = {
  // get all users

  getAllUsers(req, res) {
      User.find({})
      .select('__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      });
    },


// get one user by id 
getUserById ({ params }, res) {
    User.findOne({ _id: params.id })
    .populate({
        path: 'friends',
        path: 'thoughts',
        select: '-__v'
    })
    .select(-__v)
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: ' No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
},
//create user

createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

//update user by id 
updateUser({ params, body }, res) {
    User.findOneAndUpdate({_id: params.id }, body, {new: true, runValidators: true })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'no user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
        .catch(err => res.status(400).json(err));
    
},

// delete user 
deleteUser({ params}, res) {
    User.findOneAndDelete({_id: params.id })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
},

//add friend 

addFriend ({ params, body }, res) {
    User.findOneAndUpdate(
        {_id: params.UserID},
        { $push: {friends: params.addFriend}},
        {new: true, runValidators: true }
    )
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'no user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
        .catch(err => res.status(400).json(err));
},
//remove friend 

removeFriend( { params }, res) {
    User.findOneAndUpdate(
        {_id: params.userId },
        { $pull: { friends: params.friendId }},
        {new:true}
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
}

};



module.exports = userController;
