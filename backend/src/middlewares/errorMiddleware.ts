import { NextFunction, Request, Response } from 'express';

export class ErrorHandler extends Error {
  public code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

const errorMiddleware = (err: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
  const { message, code } = err;
  if (code) {
    return res.status(code).json({ message });
  }
  return res.status(500).json({ message });
};

export default errorMiddleware;