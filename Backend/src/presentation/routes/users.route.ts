import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { user_controller } from "../controllers/user.controller";

export const users_router = express.Router();

const controller = new user_controller();
users_router.get(
  "/all",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await controller.get_users();

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  },
);
