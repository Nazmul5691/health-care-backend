// import z from "zod";

// const createDoctorScheduleValidationSchema = z.object({
//     body: z.object({
//         scheduleIds: z.array(z.string())
//     })
// })

// export const DoctorScheduleValidation = {
//     createDoctorScheduleValidationSchema
// }


import z from "zod";

const createDoctorScheduleValidationSchema = z.object({
  body: z.object({
    scheduleIds: z.array(z.string().uuid("Invalid schedule ID format")),
  }),
});

export const DoctorScheduleValidation = {
  createDoctorScheduleValidationSchema,
};