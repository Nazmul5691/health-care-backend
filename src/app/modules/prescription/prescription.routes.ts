import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { PrescriptionController } from './prescription.controller';
const router = express.Router();


router.post(
    "/",
    auth(UserRole.DOCTOR),
    PrescriptionController.createPrescription
);


// get my prescription as a patient

export const PrescriptionRoutes = router;