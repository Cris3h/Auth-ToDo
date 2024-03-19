const database = require("../../schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginService = async (obj) => {
   const { email, password } = obj;
   try {
      const user = await database.User.find({ email });
      if (!user.length) throw new Error("User email doesn't exists");
      const success = await bcrypt.compare(password, user[0].hashed_password);
      const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: "1hr" });
      if (success) {
         return { email: user[0].email, token };
      } else {
         throw new Error('detail: "login failed"');
      }
   } catch (error) {
      throw new Error(error.message);
   }
};
module.exports = loginService; 