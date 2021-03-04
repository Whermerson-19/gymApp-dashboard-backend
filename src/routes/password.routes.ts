import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import ForgotPasswordController from "../controllers/Users/ForgotPasswordController";

const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
    }),
  }),
  forgotPasswordController.create
);

export default passwordRouter;
