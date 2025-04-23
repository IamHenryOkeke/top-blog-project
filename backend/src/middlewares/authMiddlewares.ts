import passport from "../config/passport-config";
import { AppError } from "../error/errorHandler";

const isAuthenticated = (req: any, res: any, next: any) => {
  passport.authenticate('jwt', { session: false }, function(err: any, user: any, info: any) {
    if (err) return next(err);
    if (!user) throw new AppError("You are not authorized to access this resource", 401);

    req.user = user;
    return next();
  })(req, res, next);
};


const isAdmin = (req: any, res: any, next: any) => {
  if (req.user && req.user.role === 'ADMIN') {
    return next();
  } else {
    throw new AppError("You are not authorized to access this resource", 403); 
  }
}

export { isAdmin, isAuthenticated };

