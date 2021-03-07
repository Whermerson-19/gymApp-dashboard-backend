import AdminUser from "../../models/AdminUser";

import { hash } from "bcrypt";
import AppError from "../../errors/AppError";

import AdminUsersRepository from "../../repositories/AdminUsers/AdminUsersRepository";
import OthersUsersRepository from "../../repositories/OthersUsers/OthersUsersRepository";

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
    const teachersRepository = new OthersUsersRepository();

    const checkAdminUsersEmail = await adminUsersRepository.findByEmail(email);
    const checkTeachersEmail = await teachersRepository.findByEmail(email);

    if (checkAdminUsersEmail || checkTeachersEmail)
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
