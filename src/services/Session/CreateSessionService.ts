import User from "../../models/AdminUser";
import UsersRepository from "../../repositories/AdminUsers/UsersRepository";

import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";

import AppError from "../../errors/AppError";

import authConfig from "../../config/auth";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: User;
}

export default class CreateSessionService {
  public async init({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findByEmail(email);
    if (!user) throw new AppError("Invalid email or password");

    const checkPassword = await compare(password, user.password);
    if (!checkPassword) throw new AppError("Invalid email or password");

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      token,
      user,
    };
  }
}
