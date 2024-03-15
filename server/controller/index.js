const {
  getAllToDosService,
  postNewToDoService,
  toDoPatchService,
  toDoDeleteService,
  loginService,
  signUpService
} = require("../services");

const allToDos = async (req, res) => {
  const { userEmail } = req.params;
  try {
    const todos = await getAllToDosService(userEmail);
    res.json(todos);
  } catch (error) {
    throw new Error(error.message);
  }
};

const postToDo = async (req, res) => {
  try {
    const post = await postNewToDoService(req.body);
    console.log("post -->", post);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

const patchToDo = async (req, res) => {
  const { id } = req.params;
  try {
    const patch = await toDoPatchService(id, req.body);
    res.status(200).json(patch);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const deleteToDo = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await toDoDeleteService(id);
    console.log(deleted);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const userLogin = await loginService(req.body);
    res.json(userLogin);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const signUpController = async (req, res) => {
  // const { email, password } = req.body
  try {
    const userSignUp = await signUpService(req.body);
    res.json(userSignUp);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  allToDos,
  postToDo,
  patchToDo,
  deleteToDo,
  loginController,
  signUpController,
};
