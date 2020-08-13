const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/customer");
const customers = new CustomerController();

router.get("/", customers.getAll);

router.get("/:id", customers.getById);

router.get("/cities", customers.getTotalByCities);

router.get("/cities/:city", customers.getByCity);

module.exports = router;
