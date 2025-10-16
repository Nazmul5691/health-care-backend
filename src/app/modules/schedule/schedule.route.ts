import express from "express";
import { ScheduleController } from "./schedule.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";



const router = express.Router()




router.post("/", ScheduleController.insertIntoDb);
router.get("/", ScheduleController.schedulesForDoctor)


export const ScheduleRoutes = router;