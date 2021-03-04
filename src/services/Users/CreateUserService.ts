import { hash } from "bcrypt";
import AppError from "../../errors/AppError";

import User from "../../models/User";

import UsersRepository from "../../repositories/Users/UsersRepository";

interface IRequest {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export default class CreateUserService {
  public async init({
    username,
    email,
    password,
    confirm_password,
  }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();

    const checkedEmail = await usersRepository.findByEmail(email);
    if (checkedEmail) throw new AppError("This email is already in use", 412);

    if (password !== confirm_password)
      throw new AppError("Password does not match", 412);

    const hashPassword = await hash(password, 10);

    const user = await usersRepository.create({
      username,
      email,
      password: hashPassword,
    });

    return user;
  }
}
