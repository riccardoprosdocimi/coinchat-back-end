import usersModel from "../database-model/users-model.js";

export const createUser = async user => await usersModel.create(user);
export const findAllUsers = async () => await usersModel.find();
export const findUserById = async uid => await usersModel
    .findById(uid, {password: false});
export const findUserByUsername = async username => await usersModel
    .findOne({handle: username}, {password: false});
export const findByCredentials = async ({handle: username, password}) => await usersModel
    .findOne({handle: username, password}, {password: false});
export const deleteUser = async uid => await usersModel.deleteOne({_id: uid});
export const updateUser = async (uid, userUpdates) => await usersModel
    .updateOne({_id: uid}, {$set: userUpdates});