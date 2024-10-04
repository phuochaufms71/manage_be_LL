import express from "express";
import { auth } from "../middleware/auth.js";
import { authAdmin } from "../middleware/authAdmin.js";
import { createTimeTable, getTimeTables } from "../controllers/timeTableController.js";

const router = express.Router();

router.get("/manage/lists", auth, getTimeTables);
// router.get("/manage/lists/:id", auth, getStudentDetail);
router.post("/manage/create", createTimeTable);
// router.put("/manage/update/:id", auth, authAdmin, updateStudent);
// router.delete("/manage/delete/:id", auth, authAdmin, deleteStudent);

export {router as timeTableRoute};