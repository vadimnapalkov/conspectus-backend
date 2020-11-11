import dayjs from 'dayjs';

export function nextMonday() {
  return dayjs()
    .add(1, 'week')
    .startOf('week')
    .add(1, 'day')
    .format();
}
