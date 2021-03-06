import OthersUsers from "../../models/OthersUsers";

export interface ICreateOthersUsersData {
  username: string;
  email: string;
  password: string;
  type: "teacher" | "personal";
}

export default interface IPersonalRepository {
  findById(personal_id: string): Promise<OthersUsers | undefined>;
  findByEmail(email: string): Promise<OthersUsers | undefined>;
  create(data: ICreateOthersUsersData): Promise<OthersUsers>;
  save(teacher: OthersUsers): Promise<OthersUsers>;
  list(condiction_list: string): Promise<OthersUsers[]>;
}
