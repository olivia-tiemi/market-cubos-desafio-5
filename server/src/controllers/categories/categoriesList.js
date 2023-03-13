const prisma = require("../../client/prismaClient");

const categoriesList = async (req, res) => {
  try {
    const categories = await prisma.categories.findMany();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = categoriesList;
