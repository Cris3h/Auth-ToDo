const loginService  = require("../../services/users/user-login-services");


const loginController = async (req, res) => {
   try {
      const userLogin = await loginService(req.body);
      res.json(userLogin);
   } catch (error) {
      res.status(404).json({ msg: error.message });
   }
};

module.exports = loginController;