const { Prisma } = require("@prisma/client");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;
const prisma = require("../../client/prismaClient");
const sendEmail = require("../../utils/sendEmail");

const userRegister = async (req, res) => {
  const { storeName, email, password } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: {
        storeName,
        email,
        password: encryptedPassword,
      },
    });
    const { password: _, ...userData } = user;
    const file = (
      await fs.readFile("./src/templates/registerEmail.html")
    ).toString();
    sendEmail(file, { storeName }, { storeName, email });
    return res.status(201).json(userData);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ message: "Dados inválidos." });
    }
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = userRegister;
