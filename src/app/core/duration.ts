export interface DurationLabels {
  year: string;
  years: string;
  month: string;
  months: string;
}

const parse = (ym: string) => {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
};

/** Meses entre dos fechas `YYYY-MM`, contando ambos meses extremos. */
export function monthsBetween(start: string, end: string | Date): number {
  const endIndex = typeof end === 'string' ? parse(end) : end.getFullYear() * 12 + end.getMonth();
  return Math.max(1, endIndex - parse(start) + 1);
}

export function formatDuration(totalMonths: number, labels: DurationLabels): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const fill = (tpl: string, n: number) => tpl.replace('{{n}}', String(n));
  return [
    years ? fill(years === 1 ? labels.year : labels.years, years) : '',
    months ? fill(months === 1 ? labels.month : labels.months, months) : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export function formatMonth(ym: string, lang: string): string {
  const [y, m] = ym.split('-').map(Number);
  return new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(Date.UTC(y, m - 1, 1)))
    .replace('.', '');
}
