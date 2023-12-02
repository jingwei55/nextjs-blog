// middlewares/session.js
import session from "express-session";
import MySQLStore from "express-mysql-session";

const sessionStore = new MySQLStore({
  /* Your MySQL database configuration */
  host: "localhost",
  user: "root",
  password: "root",
  database: "adoptionwebsite",
});

const sessionMiddleware = session({
  secret: "your-secret-key", // Change this to a secure random key
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
});

export default sessionMiddleware;
