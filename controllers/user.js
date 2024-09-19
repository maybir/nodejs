const users = [
    { id: 1, name: 'J' },
    { id: 2, name: 'Ja' },
    { id: 3, name: 'Jay' }
];


const getUsers = (req, res)=>{
    return res.json(users);
}

const addUser = (req, res) => {
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);

    const { name } = req.body;

    if (name == null) {
        return res.status(400).json('Name is required');
    }

    const nameExists = users.find(user => user.name === name);
    if (nameExists) {
        return res.status(400).json('Name already exists. Use a different name');
    }

    const user = {
        id: users.length + 1,
        name,
    };
    users.push(user);
    return res.status(201).json(users);
}

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
    return res.status(200).json(users);
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