import passport from "./../config/passport-config";

const isAuthenticated = passport.authenticate('jwt', { session: false })

export default isAuthenticated;

