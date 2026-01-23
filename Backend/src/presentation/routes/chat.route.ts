import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import type { create_chat_dto } from "../../application/dto/chat.dto";
import { chat_controller } from "../controllers/chat.controller";
import { verify } from "../middlewares/verify.middleware";
export const chat_router = express.Router();

const controller = new chat_controller();

chat_router.get(
  "/",
  verify,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies["Access-Token"];
      const response = await controller.get_chats(token);

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  },
);

chat_router.post(
  "/new",
  verify,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: create_chat_dto = req.body;
      const token = req.cookies["Access-Token"];
      const response = await controller.new_chat(token, data);

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  },
);
