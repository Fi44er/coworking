import { BadRequestException } from "@nestjs/common";
import { convertStringToTime } from "./convertStringToDate.util";

export const countingTimeEnd = (timeStartStr: string, duration: string) => {
    const regex = /^(?!0{2,}\.\d+$)\d+\.\d+$/;
    if(!regex.test(duration)) throw new BadRequestException('Не корректно указано время')
    const [hour2, minute2] = duration.split('.');
    const dateTime = convertStringToTime(timeStartStr)
    
    const timeStart = `${dateTime.getHours()}:${dateTime.getMinutes()}`;
    const [hour1, minute1] = timeStart.split(':');
    const hour = +hour1 + +hour2
    const minute = +minute1 + +minute2
    return new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), hour, minute);
}
