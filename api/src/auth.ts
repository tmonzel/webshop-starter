import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserModel, UserRoles } from './models/user.model';

export type AuthRequest = Request & { user?: User };

interface AuthTokenPayload {
  userId: string;
  username: string;
  userRoles: string[]; 
}

export const signToken = (payload: AuthTokenPayload): string => {
  return jwt.sign(payload, process.env.AUTH_SECRET ?? '', {
    expiresIn: 86400 // 24 hours
  });
}

export const verifyToken = (token: string): AuthTokenPayload => {
  return jwt.verify(token, process.env.AUTH_SECRET ?? '') as AuthTokenPayload;
}

// Auth required middleware
export const authRequired = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      // Missing token in auth header
      return res.sendStatus(401);
    }

    try {
      const payload = verifyToken(token);
      const user = await UserModel.findById(payload.userId);

      if(!user) {
        // User not found
        return res.sendStatus(403);
      }

      req.user = user;
      
      next();

    } catch(error) {
      return res.sendStatus(403);
    }
};

export const allowAdminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if(!req.user?.roles.includes(UserRoles.ADMIN)) {
    return res.sendStatus(403);
  }

  next();
}
