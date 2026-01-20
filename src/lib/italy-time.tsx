export function convertToItalyTime(time24: string) {
    const [hours, minutes] = time24.split(":").map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);

    const italyTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Rome",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    }).format(now);

    return italyTime;
}
