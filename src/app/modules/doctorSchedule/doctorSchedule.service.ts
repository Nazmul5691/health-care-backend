// import { prisma } from "../../shared/prisma";
// import { IJWTPayload } from "../../types/common";

// const insertIntoDB = async (user: IJWTPayload, payload: {
//     scheduleIds: string[]
// }) => {
//     const doctorData = await prisma.doctor.findUniqueOrThrow({
//         where: {
//             email: user.email
//         }
//     });

//     const doctorScheduleData = payload.scheduleIds.map(scheduleId => ({
//         doctorId: doctorData.id,
//         scheduleId
//     }))

//     return await prisma.doctorSchedules.createMany({
//         data: doctorScheduleData
//     });
// }

// export const DoctorScheduleService = {
//     insertIntoDB
// }



import { prisma } from "../../shared/prisma";
import { IJWTPayload } from "../../types/common";

const insertIntoDB = async (user: IJWTPayload, payload: { scheduleIds: string[] }) => {
  console.log("Service called with user:", user);
  console.log("Payload:", payload);

  // 1. Check if doctor exists
  const doctorData = await prisma.doctor.findUnique({
    where: { email: user.email },
  });

  if (!doctorData) {
    throw new Error("Doctor not found for this email");
  }

  // 2. Validate all schedule IDs
  const validSchedules = await prisma.schedule.findMany({
    where: { id: { in: payload.scheduleIds } },
  });

  if (validSchedules.length !== payload.scheduleIds.length) {
    throw new Error("One or more schedule IDs are invalid");
  }

  // 3. Prepare data
  const doctorScheduleData = payload.scheduleIds.map((scheduleId) => ({
    doctorId: doctorData.id,
    scheduleId,
  }));

  // 4. Create entries
  const result = await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
    skipDuplicates: true, // Prevent errors if already inserted
  });

  return result;
};

export const DoctorScheduleService = {
  insertIntoDB,
};
