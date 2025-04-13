import { formatDate } from './date';

describe('formatDate', () => {
  it('returns formatted date when given a valid date string', () => {
    expect(formatDate('2023-04-13T12:00:00Z')).toBe('2023-04-13');
  });

  it('returns null when date string is undefined', () => {
    expect(formatDate(undefined)).toBeNull();
  });

  it('returns the original string when the date is invalid', () => {
    expect(formatDate('invalid-date')).toBe('invalid-date');
  });

  it('handles empty string input', () => {
    expect(formatDate('')).toBeNull();
  });
});
