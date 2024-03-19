const database = require("../../schema");

const getAllToDosService = async (obj) => {
   const { id } = obj;
   try {
      const todos = await database.ToDo.find({ user_email: id });

      //more user data
      //brings all the ToDO from the user.
      // const todos = await database.User.find({ user_email: id }).populate('todo')

      if (!todos.length) return new Error("this user doesn't have any todo yet!");
      return todos;
   } catch (error) {
      return new Error(error.message);
   }
};

module.exports = getAllToDosService;