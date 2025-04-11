/**
 * Formats a date string to YYYY-MM-DD.
 * Returns null if the date string is invalid or empty.
 *
 * @param {string | undefined} dateStr
 * @returns {string | null}
 */
export const formatDate = (dateStr?: string): string | null => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? dateStr : date.toISOString().split('T')[0];
};
