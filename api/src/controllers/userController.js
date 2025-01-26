const User = require('../models/user');

const getAllUsers = async (req, res, next) => {
try {
    const users = await User.findAll();
    res.json(users);
} catch (error) {
    next(error);
}
};

const getUserById = async (req, res, next) => {
try {
    const user = await User.findById(req.params.id);
    if (!user) {
    return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
} catch (error) {
    next(error);
}
};

const createUser = async (req, res, next) => {
try {
    const user = await User.create(req.body);
    res.status(201).json(user);
} catch (error) {
    next(error);
}
};

const updateUser = async (req, res, next) => {
try {
    const user = await User.update(req.params.id, req.body);
    if (!user) {
    return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
} catch (error) {
    next(error);
}
};

const deleteUser = async (req, res, next) => {
try {
    const success = await User.delete(req.params.id);
    if (!success) {
    return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
} catch (error) {
    next(error);
}
};

module.exports = {
getAllUsers,
getUserById,
createUser,
updateUser,
deleteUser
};

