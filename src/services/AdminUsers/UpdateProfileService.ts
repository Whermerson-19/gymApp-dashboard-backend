import User from "../../models/AdminUser";
import UsersRepository from "../../repositories/AdminUsers/UsersRepository";

import { hash, compare } from "bcrypt";

import AppError from "../../errors/AppError";

interface IRequest {
  user_id: string;
  username: string;
  email: string;
  current_password?: string;
  new_password?: string;
  confirm_password?: string;
}

export default class UpdateProfileService {
  public async init({
    user_id,
    username,
    email,
    current_password,
    new_password,
    confirm_password,
  }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new AppError("This user does not exist", 401);

    user.username = username;
    user.email = email;

    if (current_password && new_password && confirm_password) {
      const verifyCurrentPassword = await compare(
        current_password,
        user.password
      );
      if (!verifyCurrentPassword)
        throw new AppError("Invalid current password");

      if (new_password === confirm_password) {
        const hashedPassword = await hash(new_password, 10);
        user.password = hashedPassword;
      } else {
        throw new AppError("Password does not match");
      }
    } else if (current_password && new_password && !confirm_password) {
      throw new AppError("You forgoted to confirm the password");
    } else if (current_password && !new_password && confirm_password) {
      throw new AppError("You forgot to enter the new password");
    } else if (!current_password && new_password && confirm_password) {
      throw new AppError("You must to enter the current password");
    }

    return usersRepository.save(user);
  }
}
