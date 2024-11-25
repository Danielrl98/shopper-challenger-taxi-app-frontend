export function formatDate(isoString: string) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatDistance(value: number) {
  if (value > 1000) {
    return value + 'm';
  } else {
    return value + 'km';
  }
}
