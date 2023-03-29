import express from "express";
const router = express.Router();
import HomeController from "../controllers/home.js";

router.get("/", HomeController.Index);
router.post("/", HomeController.Check);

export default router;
