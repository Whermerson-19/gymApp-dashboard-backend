import { getRepository } from "typeorm";

import AdminUser from "../../models/AdminUser";
import ClientUser from "../../models/ClientUser";

import { hash } from "bcrypt";
import AppError from "../../errors/AppError";

import AdminUsersRepository from "../../repositories/AdminUsers/UsersRepository";
import TeachersRepository from "../../repositories/Teachers/TeachersRepository";

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
  }: IRequest): Promise<AdminUser> {
    const adminUsersRepository = new AdminUsersRepository();
    const clientUsersRepository = getRepository(ClientUser);
    const teachersRepository = new TeachersRepository();

    const checkAdminUsersEmail = await adminUsersRepository.findByEmail(email);
    const checkTeachersEmail = await teachersRepository.findByEmail(email);
    const checkClientUsersRepository = await clientUsersRepository.findOne({
      where: {
        email,
      },
    });

    if (
      checkAdminUsersEmail ||
      checkTeachersEmail ||
      checkClientUsersRepository
    )
      throw new AppError("This email is already in use", 412);

    if (password !== confirm_password)
      throw new AppError("Password does not match", 412);

    const hashPassword = await hash(password, 10);

    const user = await adminUsersRepository.create({
      username,
      email,
      password: hashPassword,
    });

    return user;
  }
}
