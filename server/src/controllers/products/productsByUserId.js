const prisma = require("../../client/prismaClient");
const s3 = require("../../config/s3");
const { Prisma } = require("@prisma/client");

const productsByUserId = async (req, res) => {
  const { id: userId } = req.loggedUser;
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
          userId,
        },
        include: { user: { select: { storeName: true } } },
      });
      if (products.length === 0) {
        const user = await prisma.users.findUnique({ where: { id: userId } });
        return res.status(200).json({ storeName: user.storeName });
      }
    } else if (!filter) {
      products = await prisma.$transaction([
        prisma.products.count(),
        prisma.products.findMany({
          skip: offset,
          take: Number(perPage),
          where: { userId },
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
            AND: {
              title: {
                contains: filter,
                mode: "insensitive",
              },
              userId,
            },
          },
          include: { user: { select: { storeName: true } } },
        }),
      ]);
    }
    return res.status(200).json(products);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res
        .status(404)
        .json({ message: "O usuário não cadastrou produtos." });
    }
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const productRegister = async (req, res) => {
  const { title, description, price, stock, sold, categoryId } = req.body;
  const { loggedUser, file } = req;
  try {
    const photo = await s3
      .upload({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: `${loggedUser.id}-${loggedUser.storeName}/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();
    const product = await prisma.products.create({
      data: {
        title,
        description,
        price: Number(price),
        stock: Number(stock),
        sold: Number(sold),
        photoUrl: photo.Location,
        photoPath: photo.Key,
        userId: loggedUser.id,
        categoryId: Number(categoryId),
      },
    });
    return res.status(201).json(product);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ message: "Dados inválidos." });
    }
    console.log(error.message);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const productUpdate = async (req, res) => {
  const { title, description, price, stock, sold, categoryId } = req.body;
  const { loggedUser, file } = req;
  const { id } = req.params;
  try {
    const product = await prisma.products.findMany({
      where: {
        AND: { userId: loggedUser.id, id: Number(id) },
      },
    });
    if (product.length === 0) {
      return res.status(401).json({ message: "Produto não encontrado." });
    }
    await s3
      .deleteObject({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: product[0].photoPath,
      })
      .promise();
    const photo = await s3
      .upload({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: `${loggedUser.id}-${loggedUser.storeName}/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();
    const updatedProduct = await prisma.products.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        price: Number(price),
        stock: Number(stock),
        sold: Number(sold),
        photoUrl: photo.Location,
        photoPath: photo.Key,
        userId: loggedUser.id,
        categoryId: Number(categoryId),
      },
    });
    return res.status(201).json(updatedProduct);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ message: "Dados inválidos." });
    }
    console.log(error.message);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.loggedUser;
  try {
    const product = await prisma.products.findMany({
      where: {
        AND: { userId, id: Number(id) },
      },
    });
    if (product.length === 0) {
      return res.status(401).json({ message: "Produto não encontrado." });
    }
    await prisma.products.delete({ where: { id: product[0].id } });
    await s3
      .deleteObject({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: product[0].photoPath,
      })
      .promise();
    return res.status(204).send();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = {
  productsByUserId,
  productRegister,
  productUpdate,
  deleteProduct,
};
