const router = require('express').Router();

// Set requirements (from users-controller)
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  } = require('../../controllers/users-controllers');

// -- Directs to: /api/users <GET, POST>
router.route('/').get(getAllUsers).post(createUser);

// -- Directs to: /api/users/:id <GET, PUT, DELETE>
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);


// Module export router
module.exports = router; 