import { Request, Response } from "express";
import {
  TCreateUser,
  TResCreateUser,
  TUser,
  TUsersList,
} from "../../interfaces/user.interfaces";
import userServices from "../../services/user/user.services";

const createUser = async (req: Request, res: Response) => {
  const data: TCreateUser = req.body;

  const newUser: TResCreateUser = await userServices.createUserService(data);

  return res.status(201).json(newUser);
};

const loginUser = async (req: Request, res: Response) => {
  const token: string = await userServices.loginUserService(req.body);

  return res.status(200).json({ token: token });
};

const listUsers = async (req: Request, res: Response) => {
  const userList: TUsersList = await userServices.getActiveUsers();

  return res.status(200).json(userList);
};

const rerieveUser = async (req: Request, res: Response) => {
  const id: number = res.locals.id;

  const user: Omit<TUser, 'password'> = await userServices.getOwnerUserService(id);

  return res.status(200).json(user);
}

const updateUser = async (request: Request, response: Response) => {
  const id: number = Number(request.params.id);

  const updatedUser = await userServices.updateUserService(request.body, id);

  return response.status(200).json(updatedUser);
};

const deleteUser = async (request: Request, response: Response) => {
  const id: number = Number(request.params.id);

  await userServices.deleteUserService(id);

  response.status(204).send();
};

export default { createUser, loginUser, updateUser, listUsers, deleteUser, rerieveUser };
