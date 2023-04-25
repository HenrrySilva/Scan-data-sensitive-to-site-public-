
export class DateUtils {

    static convertTimeToDate(time: number) {
        const dateInstance = new Date(time);
        const [day, month, year, hour, minutes, seconds] = [dateInstance.getDay(), dateInstance.getMonth(),
        dateInstance.getFullYear(), dateInstance.getHours(), dateInstance.getMinutes(),
        dateInstance.getSeconds()]
            .map(date => String(date).padStart(2, '0'))
        return `${day}/${month}/${year} às ${hour}:${minutes}:${seconds}`;
    }

}