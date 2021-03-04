import UsersToken from "../../models/UsersToken";
import User from "../../models/User";

import { getRepository } from "typeorm";
import UsersRepository from "../../repositories/Users/UsersRepository";

import { hash } from "bcrypt";

import AppError from "../../errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async init({ token, password }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();
    const usersTokenRepository = getRepository(UsersToken);

    const userToken = await usersTokenRepository.findOne({
      where: {
        token,
      },
    });

    if (!userToken) throw new AppError("Token does not exist", 400);

    const user = await usersRepository.findById(userToken.user_id);
    if (!user) throw new AppError("Invalid user");

    const createdToken = userToken.created_at;

    if (new Date(Date.now()).getHours() - createdToken.getHours() > 1)
      throw new AppError("Token expired!", 401);

    user.password = await hash(password, 10);
    return usersRepository.save(user);
  }
}
