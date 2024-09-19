const { getUsers, addUser, deleteUser, updateUser } = require('../controllers/user.JS');

const router = require('express').Router();

router.get('/users', getUsers);

router.post('/add-user', addUser);//addUser, ctrl+space, click to import

router.delete('/delete-user/:id', deleteUser);

router.patch('/update-user/:id',updateUser)

module.exports = router;


/*
// Delete User
router.delete('/delete-user', (req, res) => {
    const { id } = req.body;

    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json('User not found');
    }

    users.splice(userIndex, 1);
    return res.status(200).json(users);
});*/


/*
// Update User
router.patch('/update-user', (req, res) => {
    const { id, name } = req.body;

    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).json('User not found');
    }

    if (!name) {
        return res.status(400).json('Name is required');
    }

    user.name = name;
    return res.status(200).json(users);
});*/