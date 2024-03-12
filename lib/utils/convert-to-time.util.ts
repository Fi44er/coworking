export const countingTimeEnd = (timeStart: string, duration) => {
    // 2024-01-01T00:00:00
    const [hour1, minute1] = timeStart.split(':');
    const [hour2, minute2] = timeStart.split(':');
    const hour = +hour1 + +hour2
    const minute = +minute1 + +minute2
    const date = new Date(1970, 0, 1, +hour, +minute, 0, 0);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false });
}