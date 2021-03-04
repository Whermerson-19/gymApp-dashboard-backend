import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import authorization from "../middlewares/authorization";

import multer from "multer";
import uploadConfig from "../config/upload";

import UsersController from "../controllers/Users/UsersController";
import UpdateImageController from "../controllers/Users/UpdateImageController";

const userRouter = Router();

const usersController = new UsersController();
const updateImageController = new UpdateImageController();
const upload = multer(uploadConfig);

userRouter.post(
  "/signup",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      confirm_password: Joi.ref("password"),
    }),
  }),
  usersController.create
);

userRouter.patch(
  "/update-image",
  authorization,
  upload.single("image"),
  updateImageController.update
);

export default userRouter;
