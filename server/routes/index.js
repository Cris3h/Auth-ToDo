const { Router } = require("express");
const { loginController, signUpController, allToDos, postToDo, patchToDo, deleteToDo } = require("../controller");
const router = Router();

router.get("/todos/:id", allToDos);
router.post("/todos", postToDo);
router.patch("/todos/:id", patchToDo);
router.delete("/todos/:id", deleteToDo);
router.post("/login", loginController);
router.post("/signup", signUpController);

module.exports = router;
