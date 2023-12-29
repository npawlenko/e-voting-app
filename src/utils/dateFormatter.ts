export function is12HourFormat(locale = 'en-US') {
    const timeString = new Date().toLocaleTimeString(locale, { hour: 'numeric' });
    return timeString.includes('AM') || timeString.includes('PM');
}
  
export function formatDate(date: string, locale='en-US') {
    return new Date(date).toLocaleString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: undefined,
        hour12: is12HourFormat(locale)
    });
}