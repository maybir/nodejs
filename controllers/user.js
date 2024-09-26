const User = require('../models/user');

const users = [
    { id: 1, name: 'J' },
    { id: 2, name: 'Ja' },
    { id: 3, name: 'Jay' }
];


const getUsers = async (req, res)=>{
    try{
        const users = await User.find().select('-password');
        return res.status(200).json(users);
    } catch(error){
    return res.status(500).json( {error: error.message });
    }
}

const addUser = (req, res) => {
    const { name, email, password } = req.body;
  
    const newUser = new User({ name, email, password });
    newUser.save();
  
    return res.status(201).json(newUser);
  };




const updateUser =  (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const user = users.find((user) => user.id === +id)//the + is meant to cast the string to number

    if (!user) {
        return res.status(404).json('User not found');
    }
    const nameExists = users.find(user => user.name === name);
    if (nameExists) {
        return res.status(400).json('Name already exists. Use a different name');
    }

    user.name = name;
    return res.status(201).json(users);
}

const deleteUser = (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex((user) => user.id === +id)
    if (userIndex === -1) {
        return res.status(404).json('User not found');
    }

    users.splice(userIndex, 1);
    return res.status(200).json(users);
}

module.exports= {
    getUsers,
    addUser,
    updateUser,
    deleteUser
};

//return all users, including DB