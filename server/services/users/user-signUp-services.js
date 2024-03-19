const database = require("../../schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUpService = async (obj) => {
   const { email, password } = obj;
   let userExist = await database.User.findOne({ email });
   if (userExist)
      throw new Error(
         "this user has been already created!, try loging in instead"
      );
   const saltRounds = 10;

   const salt = bcrypt.genSaltSync(saltRounds);
   const hashedpassword = bcrypt.hashSync(password, salt);
   try {
      const signUp = new database.User({
         email: email,
         hashed_password: hashedpassword,
      });
      await signUp.save();
      const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: "1hr" });

      return { email, token };
   } catch (error) {
      throw new Error(`detail: ${error.detail} `);
   }
};

module.exports = signUpService; 