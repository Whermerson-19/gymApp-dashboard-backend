import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import PasswordController from "../controllers/AdminUsers/PasswordController";

const passwordRouter = Router();

const passwordController = new PasswordController();

passwordRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
    }),
  }),
  passwordController.create
);

passwordRouter.put(
  "/reset/:token",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      password: Joi.string().required().min(6),
    }),
    [Segments.PARAMS]: Joi.object().keys({
      token: Joi.string().required(),
    }),
  }),
  passwordController.update
);

export default passwordRouter;
