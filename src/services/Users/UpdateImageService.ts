import User from "../../models/AdminUser";

import StorageProvider from "../../providers/StorageProvider";
import UsersRepository from "../../repositories/Users/UsersRepository";

import AppError from "../../errors/AppError";

interface IRequest {
  user_id: string;
  image: string;
}

export default class UpdateImageService {
  public async init({ user_id, image }: IRequest): Promise<User> {
    const storageProvider = new StorageProvider();
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new AppError("Unauthorizated operation", 401);

    if (user.image) await storageProvider.deleteFile(user.image);

    const updloadFile = await storageProvider.saveFile(image);
    user.image = updloadFile;

    return usersRepository.save(user);
  }
}
