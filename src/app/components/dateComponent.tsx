import { parseISO, format } from 'date-fns';

export default function DateComponent({ dateString }: { dateString: string }) {
  const date = parseISO(dateString);
  if (dateString == undefined) {
    return <span />;
  }
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}
