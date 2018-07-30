// prod.js - production keys here!!
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  databaseURL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  cookieKey: process.env.COOKIE_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
  API_KEY = process.env.API_KEY,
};
