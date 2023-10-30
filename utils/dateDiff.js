const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor(Math.abs(utc2 - utc1) / _MS_PER_DAY);
}

export function dateDiffYears(a, b) {
  return Math.floor(dateDiffInDays(a, b) / 365);
}
