const express = require("express");
const router = express.Router();


const {getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories} = require("../controllers/product");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

//ALL OF PARAMS
router.param("userId", getUserById);
router.param("productId", getProductById);


//ALL OF ACTUAL ROUTES
//CREATE ROUTE
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);

//READ ROUTES
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//DELETE ROUTE
router.delete("/product/:productId/:userId",isSignedIn, isAuthenticated, isAdmin, deleteProduct);


//UPDATE ROUTE
router.put("/product/:productId/:userId",isSignedIn, isAuthenticated, isAdmin, updateProduct);


//LISTING ROUTE
router.get("/products", getAllProducts)


router.get("/products/categories", getAllUniqueCategories)


module.exports = router;