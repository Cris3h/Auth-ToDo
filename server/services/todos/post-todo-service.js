const database = require("../../schema");

const postNewToDoService = async (object) => {
   const { user_email, title, progress, date } = object;
   try {
      const finder = await database.User.find({ email: user_email });
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

module.exports = postNewToDoService;