import User from "../../models/AdminUser";

export interface ICreateUserData {
  username: string;
  email: string;
  password: string;
}

export default interface IUsersRepository {
  findById(user_id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserData): Promise<User>;
  save(user: User): Promise<User>;
}
