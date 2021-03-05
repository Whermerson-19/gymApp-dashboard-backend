import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import CreateUserService from "../../services/Users/CreateUserService";
import UpdateProfileService from "../../services/Users/UpdateProfileService";

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

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfile = new UpdateProfileService();

    const user_id = request.user.id;
    const {
      username,
      email,
      current_password,
      new_password,
      confirm_password,
    } = request.body;

    const user = await updateProfile.init({
      user_id,
      username,
      email,
      current_password,
      new_password,
      confirm_password,
    });

    return response.status(200).json(classToClass(user));
  }
}
