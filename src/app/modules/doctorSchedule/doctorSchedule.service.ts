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



import { Prisma } from "@prisma/client";
import ApiError from "../../errors/ApiError";
import { IOptions, pagination } from "../../helper/pagination";
import { prisma } from "../../shared/prisma";
import { IJWTPayload } from "../../types/common";
import httpStatus from 'http-status'







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



const getMySchedule = async (
  filters: any,
  options: IOptions,
  user: IJWTPayload
) => {
  const { limit, page, skip } = pagination.calculatePagination(options);
  const { startDate, endDate, ...filterData } = filters;

  const andConditions = [];

  if (startDate && endDate) {
    andConditions.push({
      AND: [
        {
          schedule: {
            startDateTime: {
              gte: startDate
            }
          }
        },
        {
          schedule: {
            endDateTime: {
              lte: endDate
            }
          }
        }
      ]
    })
  };


  if (Object.keys(filterData).length > 0) {

    if (typeof filterData.isBooked === 'string' && filterData.isBooked === 'true') {
      filterData.isBooked = true
    }
    else if (typeof filterData.isBooked === 'string' && filterData.isBooked === 'false') {
      filterData.isBooked = false
    }

    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.DoctorSchedulesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};


  const result = await prisma.doctorSchedules.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {

        }
  });
  const total = await prisma.doctorSchedules.count({
    where: whereConditions
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const deleteFromDB = async (user: IJWTPayload, scheduleId: string) => {

  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user?.email
    }
  });

  const isBookedSchedule = await prisma.doctorSchedules.findFirst({
    where: {
      doctorId: doctorData.id,
      scheduleId: scheduleId,
      isBooked: true
    }
  });

  if (isBookedSchedule) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You can not delete the schedule because of the schedule is already booked!")
  }

  const result = await prisma.doctorSchedules.delete({
    where: {
      doctorId_scheduleId: {
        doctorId: doctorData.id,
        scheduleId: scheduleId
      }
    }
  })
  return result;

}

const getAllFromDB = async (
  filters: any,
  options: IOptions,
) => {
  const { limit, page, skip } = pagination.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      doctor: {
        name: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    if (typeof filterData.isBooked === 'string' && filterData.isBooked === 'true') {
      filterData.isBooked = true;
    } else if (typeof filterData.isBooked === 'string' && filterData.isBooked === 'false') {
      filterData.isBooked = false;
    }
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key]
        }
      }))
    });
  }

  const whereConditions: any =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.doctorSchedules.findMany({
    include: {
      doctor: true,
      schedule: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {},
  });
  const total = await prisma.doctorSchedules.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};



export const DoctorScheduleService = {
  insertIntoDB,
  getAllFromDB,
  getMySchedule,
  deleteFromDB
};
