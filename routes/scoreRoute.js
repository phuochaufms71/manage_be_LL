import express from "express";
import { createScore, getScores } from "../controllers/scoreController.js";

const router = express.Router();

router.get("/manage/lists", getScores);
// router.get("/manage/lists/:id", auth, getStudentDetail);
router.post("/manage/create", createScore);
// router.put("/manage/update/:id", auth, authAdmin, updateStudent);
// router.delete("/manage/delete/:id", auth, authAdmin, deleteStudent);

export {router as scoreRoute};