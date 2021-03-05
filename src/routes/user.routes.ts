import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import authorization from "../middlewares/authorization";

import multer from "multer";
import uploadConfig from "../config/upload";

import AdminUsersController from "../controllers/Users/AdminUsersController";
import UpdateImageController from "../controllers/Users/UpdateImageController";

const userRouter = Router();

const adminUsersController = new AdminUsersController();
const updateImageController = new UpdateImageController();
const upload = multer(uploadConfig);

userRouter.post(
  "/signup",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      confirm_password: Joi.ref("password"),
    }),
  }),
  adminUsersController.create
);

userRouter.put(
  "/update-profile",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required().min(8).max(30),
      email: Joi.string().email().required(),
      current_password: Joi.string().required().min(6),
      new_password: Joi.string().required().min(6),
      confirm_password: Joi.ref("new_password"),
    }),
  }),
  authorization,
  adminUsersController.update
);

userRouter.patch(
  "/update-image",
  authorization,
  upload.single("image"),
  updateImageController.update
);

export default userRouter;
