import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

export interface AuthRequest extends Request {
  userId?: number;
  vendorId?: number;
  adminId?: number;
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err: any, payload: any) => {
    if (err) {
      return res.sendStatus(403);
    }
    if (payload.userId) req.userId = payload.userId;
    if (payload.vendorId) req.vendorId = payload.vendorId;
    if (payload.adminId) req.adminId = payload.adminId;
    next();
  });
}