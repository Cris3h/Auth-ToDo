const toDoDeleteService = require("../../services/todos/delete-todo-service");

const deleteToDo = async (req, res) => {
   const { id } = req.params;
   try {
      const deleted = await toDoDeleteService(id);
      res.status(200).json(deleted);
   } catch (error) {
      res.status(404).json({ msg: error.message });
   }
};

module.exports = deleteToDo;