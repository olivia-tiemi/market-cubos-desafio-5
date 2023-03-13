const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../../client/prismaClient");

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loggedUser = await prisma.users.findUnique({ where: { email } });
    if (!loggedUser)
      return res.status(400).json({ message: "Dados inválidos" });
    const validPassword = await bcrypt.compare(password, loggedUser.password);
    if (!validPassword)
      return res.status(400).json({ message: "Dados inválidos" });
    const token = jwt.sign({ id: loggedUser.id }, process.env.JWT_PASSWORD, {
      expiresIn: "1h",
    });
    const { password: _password, ...userData } = loggedUser;
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const userLogout = async (req, res) => {
  try {
    res.set("Set-Cookie", "jwt=; HttpOnly; Max-Age=0; SameSite=None; Secure");
    res.status(200).json({ message: "Logout bem-sucedido." });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const userIsLogged = (req, res) => {
  return res.status(200).json({ message: "Usuário está logado!" });
};

module.exports = {
  userLogin,
  userLogout,
  userIsLogged,
};
