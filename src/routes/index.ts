import { Router } from "express";

import userRouter from "./user.routes";
import sessionRouter from "./session.routes";
import passwordRouter from "./password.routes";
import othersUsersRouter from "./othersUsers.routes";

const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/session", sessionRouter);
appRouter.use("/password", passwordRouter);
appRouter.use("/teachers", othersUsersRouter);

export default appRouter;
