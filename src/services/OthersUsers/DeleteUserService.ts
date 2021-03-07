import OthersUsers from "../../models/OthersUsers";

import OthersUsersRepository from "../../repositories/OthersUsers/OthersUsersRepository";
import AdminUsersRepository from "../../repositories/AdminUsers/AdminUsersRepository";

import MailProvider from "../../providers/MailProvider";
import StorageProvider from "../../providers/StorageProvider";

import AppError from "../../errors/AppError";

import path from "path";

interface IRequest {
  admin_id: string;
  user_id: string;
  reason?: string;
}

export default class DeleteUserService {
  public async init({ admin_id, user_id, reason }: IRequest): Promise<void> {
    const adminUsersRepository = new AdminUsersRepository();
    const othersUsersRepository = new OthersUsersRepository();

    const mailProvider = new MailProvider();
    const storageProvider = new StorageProvider();

    const admin = await adminUsersRepository.findById(admin_id);
    if (!admin) throw new AppError("Unauthorizated operation", 401);

    const deletedUser = await othersUsersRepository.findById(user_id);
    if (!deletedUser) throw new AppError("This user does not exist");

    if (deletedUser.image) await storageProvider.deleteFile(deletedUser.image);

    if (reason !== "none") {
      const template = path.resolve(__dirname, "Views", `${reason}_user.hbs`);

      await mailProvider.sendEmail({
        to: {
          name: deletedUser.username,
          address: deletedUser.email,
        },
        subject: `[GymAcademy] - Email de ${
          reason === "baned" ? "Banimento" : "Despedida"
        }`,
        templateData: {
          file: template,
          variables: {
            name: deletedUser.username,
          },
        },
      });
    }

    await othersUsersRepository.delete(deletedUser.id);
  }
}
