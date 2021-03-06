import OthersUsers from "../../models/OthersUsers";

import OthersUsersRepository from "../../repositories/OthersUsers/OthersUsersRepository";
import AdminUsersRepository from "../../repositories/AdminUsers/UsersRepository";

import { hash } from "bcrypt";

import AppError from "../../errors/AppError";

interface IRequest {
  admin_user_id: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  type: "teacher" | "personal";
}

export default class CreatePersonalService {
  public async init({
    admin_user_id,
    username,
    email,
    password,
    confirm_password,
    type,
  }: IRequest): Promise<OthersUsers> {
    const othersUsersRepository = new OthersUsersRepository();
    const adminUsersRepository = new AdminUsersRepository();

    const verifyAdminUserId = await adminUsersRepository.findById(
      admin_user_id
    );
    if (!verifyAdminUserId)
      throw new AppError("You dont have required authorization", 401);

    const checkPersonalEmail = await othersUsersRepository.findByEmail(email);
    const checkAdminUsersEmail = await adminUsersRepository.findByEmail(email);

    if (checkPersonalEmail || checkAdminUsersEmail)
      throw new AppError("This email is already in use", 412);

    if (password !== confirm_password)
      throw new AppError("Password does not match", 412);

    const hashedPassword = await hash(password, 10);

    const teacher = await othersUsersRepository.create({
      username,
      email,
      password: hashedPassword,
      type,
    });

    return teacher;
  }
}
