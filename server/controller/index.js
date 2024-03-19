module.exports = {
  loginController: require("./user/user-controller-login"),
  signUpController: require("./user/user-controller-signUp"),
  allToDos: require("./todos/all-todo-controller"),
  deleteToDo: require("./todos/delete-controller"),
  patchToDo: require("./todos/edit-todo-controller"),
  postToDo: require("./todos/post-todo-controller")
}
