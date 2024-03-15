const express = require("express");
const cors = require("cors");
const server = express();
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const database = require("./schema");

const PORT = process.env.PORT ?? 8000;

server.use(cors());
server.use(express.json());
const saltRounds = 10;

// get all
server.get("/todos/:userEmail", async (req, res) => {
  const { userEmail } = req.params;
  try {
    const todos = await database.ToDo.find({ user_email: userEmail });
    console.log(todos);
    res.json(todos);
  } catch (error) {
    console.error({ er: error });
  }
});

//create;
server.post("/todos", async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  try {
    const newToDo = await database.ToDo.create({
      user_email,
      title,
      progress,
      date,
    });
    res.json(newToDo);
  } catch (err) {
    console.error("error", err);
  }
});

//edit
server.patch("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;
  try {
    const editToDo = await database.ToDo.findByIdAndUpdate(
      { _id: id },
      { user_email, title, progress, date },
      { new: true }
    );
    res.json(editToDo);
  } catch (err) {
    console.error(err);
  }
});

//delete
server.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteToDo = await database.ToDo.findOneAndDelete({ _id: id });
    res.json(deleteToDo);
  } catch (error) {
    console.error(error);
  }
});

//signup
server.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedpassword = bcrypt.hashSync(password, salt);
  try {
    const signUp = new database.User({
      email: email,
      hashed_password: hashedpassword,
    });
    await signUp.save();
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    res.json({ email, token });
  } catch (error) {
    if (error) res.json({ detail: error.detail });
  }
});

//login
server.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await database.User.find({ email });
    if (!user.length) return res.json({ detail: "user doesn't exists!" });
    const success = await bcrypt.compare(password, user[0].hashed_password);
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    if (success) {
      res.json({ email: user[0].email, token });
    } else {
      res.json({ detail: "login failed" });
    }
  } catch (error) {
    res.json({ errorDetail: error.detail });
  }
});

server.listen(PORT, () => console.log(`server running at port ${PORT}`));
