import { Request, Response, NextFunction } from 'express';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log('Auth Header:', authHeader); // Debug log

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token); // Debug log

    // Attach token to request so you can use it in your controller
    (req as any).accessToken = token;
    return next();
  } else {
    console.error('Missing or malformed Authorization header');
    return res.status(401).json({ message: 'Missing or malformed token' });
  }
};