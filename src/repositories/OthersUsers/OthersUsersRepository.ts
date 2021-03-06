import { Repository, getRepository } from "typeorm";

import OthersUsers from "../../models/OthersUsers";

import IOthersUsersRepository, {
  ICreateOthersUsersData,
} from "./IOthersUsersRepository";

export default class OthersUsersRepository implements IOthersUsersRepository {
  private ormRepository: Repository<OthersUsers>;

  constructor() {
    this.ormRepository = getRepository(OthersUsers);
  }

  public async findById(user_id: string): Promise<OthersUsers | undefined> {
    const teacher = await this.ormRepository.findOne({
      where: {
        id: user_id,
      },
    });

    return teacher;
  }

  public async findByEmail(email: string): Promise<OthersUsers | undefined> {
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
    type,
  }: ICreateOthersUsersData): Promise<OthersUsers> {
    const user = this.ormRepository.create({
      username,
      email,
      password,
      type,
    });

    return this.ormRepository.save(user);
  }

  public async save(teacher: OthersUsers): Promise<OthersUsers> {
    return this.ormRepository.save(teacher);
  }

  public async list(
    condiction_list: string,
    page: number
  ): Promise<OthersUsers[]> {
    if (condiction_list === "all") {
      const list = await this.ormRepository.find({
        skip: page * 5 - 5,
        take: 5,
        cache: true,
      });
      return list;
    }

    const list = await this.ormRepository.find({
      where: {
        type: condiction_list,
      },
      skip: page * 5 - 5,
      take: 5,
      cache: true,
    });

    return list;
  }
}
