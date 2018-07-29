// prod.js - production keys here!!
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  database: '',
  username: '',
  password: '',
  dialect: '',
  storage: "",
  jwtSecret:"",
  cookieKey: process.env.COOKIE_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
  API_KEY = process.env.API_KEY;
};
