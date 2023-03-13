const jwt = require("jsonwebtoken");
const prisma = require("../client/prismaClient");

const loginValidation = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ message: "Não autorizado" });
  try {
    const { id } = jwt.verify(token, process.env.JWT_PASSWORD);
    const loggedUser = await prisma.users.findUnique({ where: { id } });
    if (!loggedUser) return res.status(401).json({ message: "Não autorizado" });
    const { password: _password, ...userData } = loggedUser;
    req.loggedUser = userData;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = loginValidation;
