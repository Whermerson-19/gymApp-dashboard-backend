import Teachers from "../../models/Teachers";

export interface ICreatePersonalData {
  username: string;
  email: string;
  password: string;
  type: string;
}

export default interface IPersonalRepository {
  findById(personal_id: string): Promise<Teachers | undefined>;
  findByEmail(email: string): Promise<Teachers | undefined>;
  create(data: ICreatePersonalData): Promise<Teachers>;
  save(teacher: Teachers): Promise<Teachers>;
}
