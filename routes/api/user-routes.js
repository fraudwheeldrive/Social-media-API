

const router = require('express').Router();


const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend 
} = require('../../controllers/user-controller');

//set up get all and post 
router
.route('/')
.get(getAllUsers)
.post(createUser);

// set up get one, put , and delete 

router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

router
.route('/:userId/friends/:FriendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router; 






