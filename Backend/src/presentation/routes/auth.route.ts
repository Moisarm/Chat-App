import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { auth_controller } from "../controllers/auth.controller";
import type {
  register_dto,
  user_login_dto,
} from "../../application/dto/auth.dto";
import { validate_class } from "../middlewares/validate-dto.middleware";
import {
  register_validation,
  user_login_validation,
} from "../../infrastructure/external/validation/auth.validation";

const auth_router = express.Router();

const controller = new auth_controller();

auth_router.post(
  "/register",
  validate_class(register_validation),
  async (req: Request, res: Response, next: NextFunction) => {
    const user_data: register_dto = req.body;

    console.log("Body: ", user_data);
    try {
      const response = await controller.register(user_data);

      if (response.data?.token) {
        res.cookie("Access-Token", response.data.token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
        });
      }
      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  },
);

auth_router.post(
  "/login",
  validate_class(user_login_validation),
  async (req: Request, res: Response, next: NextFunction) => {
    const login_data: user_login_dto = req.body;

    try {
      const response = await controller.login(login_data);

      if (response.data?.token) {
        res.cookie("Access-Token", response.data.token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
        });
      }

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  },
);

export { auth_router };
