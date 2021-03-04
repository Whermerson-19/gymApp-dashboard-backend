import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import ForgotPasswordMailService from "../../services/Users/ForgotPasswordMailService";
import ResetPasswordService from "../../services/Users/ResetPasswordService";

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const forgotPassword = new ForgotPasswordMailService();

    const { email } = request.body;

    await forgotPassword.init({
      email,
    });

    return response
      .status(200)
      .json({ success: "Email sent successfully, check your email." });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const resetPassword = new ResetPasswordService();

    const { token } = request.params;
    const { password } = request.body;

    const user = await resetPassword.init({
      token,
      password,
    });

    return response.status(200).json(classToClass(user));
  }
}
