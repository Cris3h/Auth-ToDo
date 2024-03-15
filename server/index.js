const express = require("express");
const cors = require("cors");
const server = express();
const morgan = require('morgan');

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const database = require("./schema");
const router = require("./routes");

const PORT = process.env.PORT ?? 8000;

server.use(cors());
server.use(express.json());
server.use(morgan('dev'));
const saltRounds = 10;


server.use('/', router);

server.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    error: true,
    message: err.message
  });
});


// //signup
// server.post("/signup", async (req, res) => {
//   const { email, password } = req.body;

//   const salt = bcrypt.genSaltSync(saltRounds);
//   const hashedpassword = bcrypt.hashSync(password, salt);
//   try {
//     const signUp = new database.User({
//       email: email,
//       hashed_password: hashedpassword,
//     });
//     await signUp.save();
//     const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
//     res.json({ email, token });
//   } catch (error) {
//     if (error) res.json({ detail: error.detail });
//   }
// });

// //login
// server.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await database.User.find({ email });
//     if (!user.length) return res.json({ detail: "user doesn't exists!" });
//     const success = await bcrypt.compare(password, user[0].hashed_password);
//     const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
//     if (success) {
//       res.json({ email: user[0].email, token });
//     } else {
//       res.json({ detail: "login failed" });
//     }
//   } catch (error) {
//     res.json({ errorDetail: error.detail });
//   }
// });

server.listen(PORT, () => console.log(`server running at port ${PORT}`));
