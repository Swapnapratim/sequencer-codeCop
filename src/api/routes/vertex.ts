import express from "express";
import contrrollers from "../controllers";

const router = express.Router();

router.get("/query/:productId", () => {});
router.post("/executetrade", () => {});
router.post("/signedwithdrawcollateral", () => {});
router.post("/updateprice", () => {});
router.post("/mintLp", () => {});
router.post("/burnLp", () => {});

export default router;
