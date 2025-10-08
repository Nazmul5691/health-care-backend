import express from "express";
import { UserController } from "./user.controller";

const route = express.Router()

route.post("/create-patient", UserController.createPatient)

export const UserRoutes = route;