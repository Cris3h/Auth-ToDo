const database = require("../../schema");


const toDoPatchService = async (id, obj) => {
   const { user_email, title, progress, date } = obj;
   try {
      const editToDo = await database.ToDo.findByIdAndUpdate(
         { _id: id },
         { user_email, title, progress, date },
         { new: true }
      );
      if (!editToDo)
         throw new Error(
            "this to do doesn't exist! please check it and try again"
         );
      return editToDo;
   } catch (err) {
      throw new Error(err.message);
   }
};

module.exports = toDoPatchService;