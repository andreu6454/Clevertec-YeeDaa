import { addWeeks, format, isWithinInterval, startOfWeek } from 'date-fns';

import { ReactionType } from '~/shared/types/usersTypes';

export function getGroupByWeekStats(data: ReactionType[]): ReactionType[] {
    if (data.length === 0) return [];

    const sortedData = [...data]
        .map((item) => ({
            ...item,
            dateObj: new Date(item.date),
        }))
        .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

    const minDate = sortedData[0].dateObj;
    const maxDate = sortedData[sortedData.length - 1].dateObj;

    const weeks: Date[] = [];
    let currentWeekStart = startOfWeek(minDate, { weekStartsOn: 1 }); // Monday as start of week

    while (currentWeekStart <= maxDate) {
        weeks.push(currentWeekStart);
        currentWeekStart = addWeeks(currentWeekStart, 1);
    }

    return weeks.map((weekStart) => {
        const weekEnd = addWeeks(weekStart, 1);
        const weekItems = sortedData.filter((item) =>
            isWithinInterval(item.dateObj, {
                start: weekStart,
                end: weekEnd,
            }),
        );

        return {
            date: format(weekStart, 'MMM d'),
            count: weekItems.reduce((sum, item) => sum + item.count, 0),
        };
    });
}
