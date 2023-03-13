const {
  userLogin,
  userLogout,
  userIsLogged,
} = require("./controllers/user/userLogin");
const userRegister = require("./controllers/user/userRegister");
const bodyValidation = require("./middlewares/bodyValidation");
const registrationSchema = require("./validations/registrationSchema");
const loginSchema = require("./validations/loginSchema");
const productSchema = require("./validations/productSchema");
const loginValidation = require("./middlewares/loginValidation");
const cookieParser = require("cookie-parser");
const {
  productsList,
  productDetail,
} = require("./controllers/products/productsList");
const categoriesList = require("./controllers/categories/categoriesList");
const {
  productsByUserId,
  productRegister,
  deleteProduct,
  productUpdate,
} = require("./controllers/products/productsByUserId");
const multer = require("multer")({});
const routes = require("express")();

routes.get("/product/:page/:perPage", productsList);
routes.get("/product/:id", productDetail);
routes.get("/category", categoriesList);
routes.get("/logout", userLogout);
routes.post("/user", bodyValidation(registrationSchema), userRegister);
routes.post("/login", bodyValidation(loginSchema), userLogin);

routes.use(cookieParser());
routes.use(loginValidation);

routes.get("/user/product/:page/:perPage", productsByUserId);
routes.post(
  "/user/product",
  multer.single("photo"),
  bodyValidation(productSchema),
  productRegister
);
routes.put(
  "/user/product/:id",
  multer.single("photo"),
  bodyValidation(productSchema),
  productUpdate
);
routes.delete("/user/product/:id", deleteProduct);
routes.get("/loggedIn", userIsLogged);

module.exports = routes;
