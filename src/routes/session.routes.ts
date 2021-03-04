import { Router } from "express";
import SessionController from "../controllers/Session/SessionController";

import { Segments, Joi, celebrate } from "celebrate";

const sessionRouter = Router();

const sessionController = new SessionController();

sessionRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  sessionController.create
);

export default sessionRouter;
