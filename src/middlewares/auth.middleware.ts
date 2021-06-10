/* eslint-disable no-constant-condition */
import { Response, Request, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
 //Fake data is admin. Will check as admin later
  if (true) return next();
  res.redirect('/');
};
