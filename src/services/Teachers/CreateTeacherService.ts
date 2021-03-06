import ClientUsers from "../../models/ClientUser";
import Teachers from "../../models/Teachers";

import { getRepository } from "typeorm";

import TeachersRepository from "../../repositories/Teachers/TeachersRepository";
import AdminUsersRepository from "../../repositories/AdminUsers/UsersRepository";

import { hash } from "bcrypt";

import AppError from "../../errors/AppError";

interface IRequest {
  admin_user_id: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  type: string;
}

export default class CreatePersonalService {
  public async init({
    admin_user_id,
    username,
    email,
    password,
    confirm_password,
    type,
  }: IRequest): Promise<Teachers> {
    const teachersRepository = new TeachersRepository();
    const adminUsersRepository = new AdminUsersRepository();
    const clientUsersRepository = getRepository(ClientUsers);

    const verifyAdminUserId = await adminUsersRepository.findById(
      admin_user_id
    );
    if (!verifyAdminUserId)
      throw new AppError("You dont have required authorization", 401);

    const checkPersonalEmail = await teachersRepository.findByEmail(email);
    const checkAdminUsersEmail = await adminUsersRepository.findByEmail(email);
    const checkClientUsersEmail = await clientUsersRepository.findOne({
      where: {
        email,
      },
    });

    if (checkPersonalEmail || checkAdminUsersEmail || checkClientUsersEmail)
      throw new AppError("This email is already in use", 412);

    if (password !== confirm_password)
      throw new AppError("Password does not match", 412);

    const hashedPassword = await hash(password, 10);

    const teacher = await teachersRepository.create({
      username,
      email,
      password: hashedPassword,
      type,
    });

    return teacher;
  }
}
