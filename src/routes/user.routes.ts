import { Router } from "express";
import { celebrate, Joi, errors, Segments } from "celebrate";

import UsersController from "../controllers/Users/UsersController";

const userRouter = Router();

const usersController = new UsersController();

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

export default userRouter;
