import { BadRequestException } from "@nestjs/common"

export const convertStringToTime = (time: string) => {
    try {
        const dateTime = new Date(time)
        if (isNaN(dateTime.getTime()) || dateTime < new Date(Date.now())) {
            throw new BadRequestException()
        }
        return dateTime
    } catch(error) {
        if(error) {
            throw new BadRequestException('Не корректно указана дата')            
        }
    }
}