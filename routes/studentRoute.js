import express from "express";
import { auth } from "../middleware/auth.js";
import { authAdmin } from "../middleware/authAdmin.js";
import { createStudent, deleteStudent, editStudent, getStudentDetail, getStudents, updateStudent } from "../controllers/studentController.js";

const router = express.Router();

router.get("/manage/lists", auth, getStudents);
router.get("/manage/lists/:id", auth, getStudentDetail);
router.post("/manage/create", auth, authAdmin ,createStudent);
router.put("/manage/update/:id", auth, authAdmin, updateStudent);
router.put("/manage/edit", editStudent);
router.delete("/manage/delete/:id", auth, authAdmin, deleteStudent);

export {router as studentRoute};