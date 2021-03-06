import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import CreateUserService from "../../services/OthersUsers/CreateUserService";
import ListUsersService from "../../services/OthersUsers/ListUsersService";

export default class TeachersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUsersService();

    const admin_id = request.user.id;
    const { condiction_list } = request.params;

    const list = await listUser.init({
      admin_id,
      condiction_list,
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
}
