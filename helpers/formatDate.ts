export function formatDate(isoDate: string): string {
  let date = new Date(isoDate);
  date.setUTCHours(10); // sets it so date is not 1 day behind in EST / PST timezones

  return new Intl.DateTimeFormat('en-CA', {year: 'numeric', month: 'long', day: 'numeric'}).format(
    date
  );
}
