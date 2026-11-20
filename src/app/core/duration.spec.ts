import { formatDuration, formatMonth, monthsBetween } from './duration';

const labels = {
  year: '{{n}} año',
  years: '{{n}} años',
  month: '{{n}} mes',
  months: '{{n}} meses',
};

describe('duration', () => {
  it('counts months inclusively', () => {
    expect(monthsBetween('2023-06', '2023-09')).toBe(4);
    expect(monthsBetween('2024-01', '2024-01')).toBe(1);
    expect(monthsBetween('2024-01', new Date(2026, 10, 20))).toBe(35);
  });

  it('formats years and months with plurals', () => {
    expect(formatDuration(4, labels)).toBe('4 meses');
    expect(formatDuration(13, labels)).toBe('1 año 1 mes');
    expect(formatDuration(24, labels)).toBe('2 años');
  });

  it('formats month labels per language', () => {
    expect(formatMonth('2024-01', 'en')).toBe('Jan 2024');
    expect(formatMonth('2024-01', 'es')).toMatch(/^ene 2024$/);
  });
});
