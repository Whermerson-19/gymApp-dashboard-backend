import { Repository, getRepository } from "typeorm";

import Teachers from "../../models/Teachers";

import IPersonalRepository, {
  ICreatePersonalData,
} from "./ITeachersRepository";

export default class PersonalRepository implements IPersonalRepository {
  private ormRepository: Repository<Teachers>;

  constructor() {
    this.ormRepository = getRepository(Teachers);
  }

  public async findById(teacher_id: string): Promise<Teachers | undefined> {
    const teacher = await this.ormRepository.findOne({
      where: {
        id: teacher_id,
      },
    });

    return teacher;
  }

  public async findByEmail(email: string): Promise<Teachers | undefined> {
    const teacher_id = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return teacher_id;
  }

  public async create({
    username,
    email,
    password,
    type,
  }: ICreatePersonalData): Promise<Teachers> {
    const teacher = this.ormRepository.create({
      username,
      email,
      password,
      type,
    });

    return this.ormRepository.save(teacher);
  }

  public async save(teacher: Teachers): Promise<Teachers> {
    return this.ormRepository.save(teacher);
  }
}
