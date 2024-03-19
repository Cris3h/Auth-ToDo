const postNewToDoService = require("../../services/todos/post-todo-service");

const postToDo = async (req, res) => {
   try {
      const post = await postNewToDoService(req.body);
      res.status(200).json(post);
   } catch (err) {
      res.status(404).json({ msg: err.message });
   }
};

module.exports = postToDo;