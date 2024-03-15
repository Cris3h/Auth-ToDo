const { Router } = require("express");
const {
  allToDos,
  postToDo,
  patchToDo,
  deleteToDo,
  loginController,
  signUpController,
} = require("../controller");
const router = Router();

router.get("/todos/:id", allToDos);
router.post("/todos", postToDo);
router.patch("/todos/:id", patchToDo);
router.delete("/todos/:id", deleteToDo);
router.post("/login", loginController);
router.post("/signup", signUpController);

module.exports = router;
