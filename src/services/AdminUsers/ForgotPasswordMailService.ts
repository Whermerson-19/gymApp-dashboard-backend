import { getRepository } from "typeorm";
import UsersRepository from "../../repositories/AdminUsers/UsersRepository";

import UsersToken from "../../models/UsersToken";

import MailProvider from "../../providers/MailProvider";
import path from "path";
import AppError from "../../errors/AppError";

interface IRequest {
  email: string;
}

export default class ForgotPasswordMailService {
  public async init({ email }: IRequest): Promise<void> {
    const usersRepository = new UsersRepository();
    const usersTokenRepository = getRepository(UsersToken);

    const mailProvider = new MailProvider();

    const user = await usersRepository.findByEmail(email);
    if (!user) throw new AppError("This email does not exist");

    const createUsersToken = usersTokenRepository.create({
      user_id: user.id,
    });

    await usersTokenRepository.save(createUsersToken);

    const template = path.resolve(__dirname, "Views", "forgot_password.hbs");

    await mailProvider.sendEmail({
      to: {
        name: user.username,
        address: user.email,
      },
      subject: "GymAcademy - Email de recuperação de senha.",
      templateData: {
        file: template,
        variables: {
          name: user.username,
          link: `http://localhost:3000/reset-password?token=${createUsersToken.token}`,
        },
      },
    });

    console.log(createUsersToken.token);
  }
}
