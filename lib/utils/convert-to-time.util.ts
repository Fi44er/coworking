export const countingTimeEnd = (timeStartStr: string, duration: string) => {
    const dateTime = new Date(timeStartStr)
    const timeStart = `${dateTime.getHours()}:${dateTime.getMinutes()}`;
    const [hour1, minute1] = timeStart.split(':');
    const [hour2, minute2] = duration.split('.');
    const hour = +hour1 + +hour2
    const minute = +minute1 + +minute2
    return new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), hour, minute);
}
