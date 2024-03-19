const signUpService = require("../../services/users/user-signUp-services");


const signUpController = async (req, res) => {
   try {
      const userSignUp = await signUpService(req.body);
      res.json(userSignUp);
   } catch (error) {
      res.status(400).json({ msg: error.message });
   }
};

module.exports = signUpController;