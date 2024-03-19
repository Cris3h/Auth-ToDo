const database = require("../../schema");

const toDoDeleteService = async (id) => {
   try {
      const deleted = await database.ToDo.findOneAndDelete({ _id: id });
      if (!deleted)
         throw new Error('please, check again. This "to do" doesnt exist');
      return deleted;
   } catch (error) {
      throw new Error(error.message);
   }
};

module.exports = toDoDeleteService;