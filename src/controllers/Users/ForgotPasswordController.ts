import { Request, Response } from "express";

import ForgotPasswordMailService from "../../services/Users/ForgotPasswordMailService";

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
}
