import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

// Define a custom request type that includes our user payload
export interface AuthRequest extends Request {
  userId?: number;
  userRole?: 'user' | 'vendor' | 'admin';
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, JWT_SECRET, (err: any, payload: any) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.sendStatus(403); // Forbidden
    }
    
    // The payload from our login endpoint is { userId, role }
    if (payload.userId && payload.role) {
      req.userId = payload.userId;
      req.userRole = payload.role;
      next();
    } else {
      // Invalid token payload
      return res.sendStatus(403);
    }
  });
}
