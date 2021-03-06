import { Router } from "express";

import userRouter from "./user.routes";
import sessionRouter from "./session.routes";
import passwordRouter from "./password.routes";
import teacherRouter from "./teacher.routes";

const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/session", sessionRouter);
appRouter.use("/password", passwordRouter);
appRouter.use("/teacher", teacherRouter);

export default appRouter;
