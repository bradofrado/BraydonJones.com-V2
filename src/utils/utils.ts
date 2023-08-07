import dayjs from "dayjs";

export function displayDates({start, end}: DateRange) {
    const format = 'MMM YYYY';
    return `${dayjs(start).format(format)}-${end ? dayjs(end).format(format) : 'present'}`;
}