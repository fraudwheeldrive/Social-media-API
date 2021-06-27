const { User } = require("../models");

const userController = {
  // get all users

  getAllUsers(req, res) {
      User.find({})
      .populate({ 
          path: 'user',
          select: '-__v'
      })
      .seletc('-__v')
      .sort({_id: -1})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
          console.log (err);
          res.sendStatus(400):
      });
  },
};

module.exports = userController;
