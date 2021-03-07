import { getRepository, Repository } from "typeorm";

import User from "../../models/AdminUser";
import IUsersRepository, { ICreateUserData } from "./IUsersRepository";

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id: user_id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async create({
    username,
    email,
    password,
  }: ICreateUserData): Promise<User> {
    const user = this.ormRepository.create({
      username,
      email,
      password,
    });

    return this.ormRepository.save(user);
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
