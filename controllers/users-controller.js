import * as usersDao from '../daos/users-dao.js';

const UsersController = app => {
    const createUser = async (req, res) => {
        const newUser = req.body;
        const actualUser = await usersDao.createUser(newUser);
        res.json(actualUser);
    };
    const register = async (req, res) => {
        const user = req.body;
        const existingUser = await usersDao.findUserByUsername(user.handle);
        if (existingUser) {  // username not unique -> already existing
            res.sendStatus(403);
        } else {
            const currentUser = await usersDao.createUser(user);
            req.session['currentUser'] = currentUser;
            res.json(currentUser);
        }
    };
    const findAllUsers = async (req, res) => {
        const users = await usersDao.findAllUsers();
        res.json(users);
    };
    const deleteUser = async (req, res) => {
        const uid = req.params.uid;
        const status = await usersDao.deleteUser(uid);
        res.json(status);
    };
    const updateUser = async (req, res) => {
        const uid = req.params.uid;
        const updates = req.body;
        const status = await usersDao.updateUser(uid, updates);
        res.json(status);
    };
    const login = async (req, res) => {
        const credentials = req.body;
        const existingUser = await usersDao.findByCredentials(credentials);
        if (existingUser) {
            req.session['currentUser'] = existingUser;
            res.json(existingUser);
        } else {
            res.sendStatus(403);
        }
    };
    const profile = async (req, res) => {
        const currentUser = req.session['currentUser']
        if (currentUser) {
            const currentProfile = await usersDao.findUserById(currentUser._id)
            res.json(currentProfile)
        } else {
            res.sendStatus(403)
        }
    };
    const logout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    const findUserById = async (req, res) => {
        const uid = req.params.uid;
        const user = await usersDao.findUserById(uid);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    };

    app.post('/api/users', createUser);
    app.post('/api/users/register', register);
    app.get('/api/users', findAllUsers);
    app.get('/api/users/:uid', findUserById);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
    app.post('/api/users/login', login);
    app.post('/api/users/profile', profile);
    app.post('/api/users/logout', logout);
};
export default UsersController;