import OthersUsers from "../../models/OthersUsers";

import OthersUsersRepository from "../../repositories/OthersUsers/OthersUsersRepository";
import AdminUsersRepository from "../../repositories/AdminUsers/AdminUsersRepository";
import AppError from "../../errors/AppError";

interface IRequest {
  admin_id: string;
  condiction_list: string;
  page: number;
}

export default class ListUsersService {
  public async init({
    admin_id,
    condiction_list,
    page,
  }: IRequest): Promise<OthersUsers[]> {
    const othersUsersRepository = new OthersUsersRepository();
    const adminUsersRepository = new AdminUsersRepository();

    const admin = await adminUsersRepository.findById(admin_id);
    if (!admin) throw new AppError("Unauthorizated operation", 401);

    const list = await othersUsersRepository.list(condiction_list, page);

    return list;
  }
}
