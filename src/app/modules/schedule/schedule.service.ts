import { addHours, addMinutes, format } from "date-fns";
import { prisma } from "../../shared/prisma";


const insertIntoDb = async (payload: any) => {

    const { startTime, endTime, startDate, endDate } = payload;
    const intervalTime = 30;

    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    const schedule = [];

    while (currentDate <= lastDate) {
        const startDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "yyyy-mm-dd")}`,
                    Number(startTime.split(":")[0])
                ),
                Number(startTime.split(":")[1])
            )
        )



        const endDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "yyyy-mm-dd")}`,
                    Number(endTime.split(":")[0])
                ),
                Number(endTime.split(":")[1])
            )
        )


        while (startDateTime < endDateTime) {
            const slotStartDateTime = startDateTime;
            const slotEndDateTime = addMinutes(startDateTime, intervalTime);


            const scheduleData = {
                startDateTime: slotStartDateTime,
                endDateTime: slotEndDateTime
            }


            const existingSchedule = await prisma.schedule.findFirst({
                where: scheduleData
            })


            if(!existingSchedule){
                const result = await prisma.schedule.create({
                    data: scheduleData
                });
                schedule.push(result)

            }
        }



    }


    return payload;

}



export const ScheduleService = {
    insertIntoDb
}