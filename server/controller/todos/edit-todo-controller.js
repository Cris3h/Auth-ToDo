const toDoPatchService = require("../../services/todos/edit-todo-service")


const patchToDo = async (req, res) => {
   const { id } = req.params;
   try {
      const patch = await toDoPatchService(id, req.body);
      res.status(200).json(patch);
   } catch (error) {
      res.status(404).json({ msg: error.message });
   }
};

module.exports = patchToDo;