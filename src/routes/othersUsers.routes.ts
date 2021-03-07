import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import authorization from "../middlewares/authorization";
import UsersController from "../controllers/OthersUsers/UsersController";

const othersUsersRouter = Router();
const usersController = new UsersController();

othersUsersRouter.use(authorization);

othersUsersRouter.post(
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
  usersController.create
);

othersUsersRouter.get(
  "/list/:condiction_list/page/:page",
  usersController.index
);

othersUsersRouter.delete(
  "/delete/:user_id/reason/:reason",
  usersController.delete
);

export default othersUsersRouter;
