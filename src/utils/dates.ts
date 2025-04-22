import dayjs from 'dayjs';

export const TODAY = dayjs();

export const WEEK_DAYS = Array.from({ length: 7 }, (_, i) => {
    return dayjs().day(i).format('ddd');
});

export const NEXT_FOUR_WEEKS = Array.from({ length: 4 }, (_, i) => {
    const weekStart = TODAY.add(i, 'week').startOf('week');
    return Array.from({ length: 7 }, (_, j) => {
        return weekStart.add(j, 'day');
    });
});

export const isPastOrToday = (date: dayjs.Dayjs) => {
    return date.isBefore(TODAY, 'day') || date.isSame(TODAY, 'day');
};
