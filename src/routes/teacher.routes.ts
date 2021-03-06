import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import authorization from "../middlewares/authorization";
import TeachersController from "../controllers/Teachers/TeachersController";

const teacherRouter = Router();
const teachersController = new TeachersController();

teacherRouter.use(authorization);

teacherRouter.post(
  "/create",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      confirm_password: Joi.ref("password"),
      type: Joi.string().required(),
    }),
  }),
  authorization,
  teachersController.create
);

export default teacherRouter;
