import { Router } from "express";
import CustomerController from "../controllers/customer";

const customerRouter = Router();
const customers = new CustomerController();

customerRouter.get("/cities", customers.getTotalByCities);

customerRouter.get("/cities/:city", customers.getByCity);

customerRouter.get("/:id", customers.getById);

export default customerRouter;
