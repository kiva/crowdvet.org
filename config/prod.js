// prod.js - production keys here!!
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  databaseURL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  cookieKey: process.env.COOKIE_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  API_KEY : process.env.API_KEY,
  SMTP_URL : process.env.SMTP_URL
};
