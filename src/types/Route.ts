import { Request, Response } from "express";

export default interface Route {
  path?: string;
  execute: (req: Request, res: Response) => void;
}
