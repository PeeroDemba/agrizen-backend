import type { Request, Response, NextFunction } from "express";

export default function errorHandler() {
  return (
    error: Error & {
      code: number;
      data?: { path: string; message: string[] }[];
    },
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const { code, ...err } = error;
    return response.status(code).send({
      status: "error",
      ...err,
    });
  };
}
