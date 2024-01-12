export const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function is12HourFormat(locale = 'en-US') {
    const timeString = new Date().toLocaleTimeString(locale, { hour: 'numeric' });
    return timeString.includes('AM') || timeString.includes('PM');
}

export function addLocalTimezoneOffset(datetimeString: string): string {
    const date = new Date(datetimeString);

    const timezoneOffset = date.getTimezoneOffset();

    const offsetHours = Math.abs(Math.floor(timezoneOffset / 60));
    const offsetMinutes = Math.abs(timezoneOffset % 60);

    const offsetString = 
        (timezoneOffset > 0 ? "-" : "+") + 
        String(offsetHours).padStart(2, '0') + ":" + 
        String(offsetMinutes).padStart(2, '0');

    return datetimeString + offsetString;
}

export function cutTimeZone(dateTime: string): string {
    return dateTime.slice(0, 16);
}

export function formatDate(date: string, locale='en-US') {
    return new Date(date).toLocaleString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: undefined,
        hour12: is12HourFormat(locale),
        timeZone
    });
}