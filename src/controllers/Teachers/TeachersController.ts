import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import CreateTeacherService from "../../services/Teachers/CreateTeacherService";

export default class TeachersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createTeacher = new CreateTeacherService();

    const admin_user_id = request.user.id;
    const { username, email, password, confirm_password, type } = request.body;

    const teacher = await createTeacher.init({
      admin_user_id,
      username,
      email,
      password,
      confirm_password,
      type,
    });

    return response.status(201).json(classToClass(teacher));
  }
}
