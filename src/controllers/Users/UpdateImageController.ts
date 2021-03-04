import { classToClass } from "class-transformer";
import { Request, Response } from "express";

import UpdateImageService from "../../services/Users/UpdateImageService";

export default class UpdateImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateImage = new UpdateImageService();

    const user_id = request.user.id;
    const image = request.file.filename;

    const user = await updateImage.init({
      user_id,
      image,
    });

    return response.status(200).json(classToClass(user));
  }
}
