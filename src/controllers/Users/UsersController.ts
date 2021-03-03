import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import CreateUserService from "../../services/Users/CreateUserService";

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUser = new CreateUserService();

    const { username, email, password, confirm_password } = request.body;

    const user = await createUser.init({
      username,
      email,
      password,
      confirm_password,
    });

    return response.status(201).json(classToClass(user));
  }
}
