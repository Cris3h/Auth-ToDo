const database = require("../schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllToDosService = async (user_email) => {
  try {
    const todos = await database.ToDo.find(user_email);
    if (!todos.length) return new Error("this user doesn't have any todo yet!");
    return todos;
  } catch (error) {
    return new Error(error.message);
  }
};

const postNewToDoService = async (object) => {
  const { user_email, title, progress, date } = object;
  try {
    const finder = await database.User.find({ email: user_email });
    console.log(finder);
    if (finder.length === 0)
      throw new Error("user is mandatory!, please check you new To Do");
    const newToDo = await database.ToDo.create({
      user_email,
      title,
      progress,
      date,
    });
    return newToDo;
  } catch (error) {
    throw new Error(error.message);
  }
};

const toDoPatchService = async (id, obj) => {
  const { user_email, title, progress, date } = obj;
  try {
    const editToDo = await database.ToDo.findByIdAndUpdate(
      { _id: id },
      { user_email, title, progress, date },
      { new: true }
    );
    if (!editToDo)
      throw new Error(
        "this to do doesn't exist! please check it and try again"
      );
    return editToDo;
  } catch (err) {
    throw new Error(err.message);
  }
};

const toDoDeleteService = async (id) => {
  try {
    const deleted = await database.ToDo.findOneAndDelete({ _id: id });
    if (!deleted)
      throw new Error('please, check again. This "to do" doesnt exist');
    return deleted;
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginService = async (obj) => {
  const { email, password } = obj;
  try {
    const user = await database.User.find({ email });
    if (!user.length) throw new Error("User email doesn't exists");
    const success = await bcrypt.compare(password, user[0].hashed_password);
    const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: "1hr" });
    if (success) {
      return { email: user[0].email, token };
    } else {
      throw new Error('detail: "login failed"');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const signUpService = async (obj) => {
  const { email, password } = obj;
  let userExist = await database.User.findOne({ email });
  if (userExist)
    throw new Error(
      "this user has been already created!, try loging in instead"
    );
  const saltRounds = 10;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedpassword = bcrypt.hashSync(password, salt);
  try {
    const signUp = new database.User({
      email: email,
      hashed_password: hashedpassword,
    });
    await signUp.save();
    const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: "1hr" });

    return { email, token };
  } catch (error) {
    throw new Error(`detail: ${error.detail} `);
  }
};

module.exports = {
  getAllToDosService,
  postNewToDoService,
  toDoPatchService,
  toDoDeleteService,
  loginService,
  signUpService,
};
