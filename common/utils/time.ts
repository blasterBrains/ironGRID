import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isYesterday from 'dayjs/plugin/isYesterday';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(isTomorrow);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(localeData, {
  weekdays: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
});

export const formatDate = (date: string, format: string = 'ddd, MMM DD') => {
  const day = dayjs(date);
  if (day.isToday()) return `Today, ${day.format('MMM DD @ h:mma')}`;
  if (day.isTomorrow()) return `Tomorrow, ${day.format('MMM DD @ h:mma')}`;
  if (day.isYesterday()) return `Yesterday, ${day.format('MMM DD @ h:mma')}`;
  return dayjs(date).format(format);
};
