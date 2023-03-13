const prisma = require("../../client/prismaClient");
const { Prisma } = require("@prisma/client");

const productsList = async (req, res) => {
  const { filter } = req.query;
  const { page, perPage } = req.params;
  const offset = page === 1 ? 0 : (page - 1) * perPage;
  try {
    let products = [];
    if (page === "all" && perPage === "all") {
      products = await prisma.products.findMany({
        where: {
          title: {
            contains: filter,
            mode: "insensitive",
          },
        },
        include: { user: { select: { storeName: true } } },
      });
    } else if (!filter) {
      products = await prisma.$transaction([
        prisma.products.count(),
        prisma.products.findMany({
          skip: offset,
          take: Number(perPage),
          include: { user: { select: { storeName: true } } },
        }),
      ]);
    } else {
      products = await prisma.$transaction([
        prisma.products.count(),
        prisma.products.findMany({
          skip: offset,
          take: Number(perPage),
          where: {
            title: {
              contains: filter,
              mode: "insensitive",
            },
          },
          include: { user: { select: { storeName: true } } },
        }),
      ]);
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const productDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.products.findUnique({
      where: { id: Number(id) },
      include: { user: { select: { storeName: true } } },
    });
    return res.json(product);
  } catch (error) {
    console.log(error.message);
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = {
  productsList,
  productDetail,
};
