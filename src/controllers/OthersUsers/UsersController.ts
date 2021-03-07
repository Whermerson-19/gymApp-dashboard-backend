import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import CreateUserService from "../../services/OthersUsers/CreateUserService";
import ListUsersService from "../../services/OthersUsers/ListUsersService";
import DeleteUserService from "../../services/OthersUsers/DeleteUserService";

export default class TeachersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUsersService();

    const admin_id = request.user.id;
    const { condiction_list, page } = request.params;

    const list = await listUser.init({
      admin_id,
      condiction_list,
      page: Number(page),
    });

    return response.status(200).json(classToClass(list));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createUser = new CreateUserService();

    const admin_user_id = request.user.id;
    const { username, email, password, confirm_password, type } = request.body;

    const user = await createUser.init({
      admin_user_id,
      username,
      email,
      password,
      confirm_password,
      type,
    });

    return response.status(201).json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteUser = new DeleteUserService();

    const admin_id = request.user.id;
    const { user_id, reason } = request.params;

    await deleteUser.init({
      admin_id,
      user_id,
      reason,
    });

    return response.status(200).json({ sucess: "deleted user with success" });
  }
}
