const getAllToDosService = require("../../services/todos/all-todo-service");

const allToDos = async (req, res) => {
   try {
      const todos = await getAllToDosService(req.params);
      res.json(todos);
   } catch (error) {
      throw new Error(error.message);
   }
};

module.exports = allToDos;