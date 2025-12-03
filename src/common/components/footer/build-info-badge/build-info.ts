export const BUILD_INFO = {
  date: __BUILD_DATE__,
  version: '1.0.0',
} as const;

export function getFormattedBuildDate(separator: string = ' - '): string {
  try {
    const date = new Date(BUILD_INFO.date);

    const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const timeFormatter = new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const datePart = dateFormatter.format(date);
    const timePart = timeFormatter.format(date);

    return `${datePart}${separator}${timePart}`;
  } catch {
    return '';
  }
}
