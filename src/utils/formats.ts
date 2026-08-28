// String formats
export const isValidString = (value: unknown): boolean => {
    return typeof value === "string" && value.trim().length > 0;
};

export const formatSentenceString = (str: unknown | null): string => {
    if (!str || !isValidString(str)) return "-";

    const words = String(str)
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2") //camelCase/PascalCase
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // consecutive acronyms

        .replace(/[_\-.]+/g, " ") // replace _, -, ., espaces - snake_case, kebab-case, dot.case, etc.
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => w.toLowerCase());

    if (words.length === 0) return "";

    return (
        words[0][0].toUpperCase() +
        words[0].slice(1) +
        (words.length > 1 ? ` ${words.slice(1).join(" ")}` : "")
    );
};

// Dates formats

const isoDateOnly = /^\d{4}-\d{2}-\d{2}$/;
const isoDateTime =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/;

export const isAValidDate = (date: string): boolean => {
    const trimmed = date.trim();
    if (!trimmed) return false;

    if (!isoDateTime.test(trimmed) && !isoDateOnly.test(trimmed)) {
        return false;
    }

    const parsed = new Date(trimmed);
    return !Number.isNaN(parsed.getTime());
};

export const getTimeZone = (): string => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const getLocale = (): string => {
    return navigator.language;
};

export const formatDate = (
    date: unknown | null,
    locale?: string,
    timeZone?: string,
    withTime: boolean = false,
): string => {
    if (!date || !isAValidDate(String(date))) return "-";

    try {
        return new Date(String(date)).toLocaleDateString(locale ?? getLocale(), {
            timeZone: timeZone ?? getTimeZone(),
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            ...(withTime
                ? {
                    hour: "2-digit",
                    minute: "2-digit",
                }
                : {}),
        });
    } catch {
        return "-";
    }
};

export const minutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(remainingMinutes).padStart(2, "0")}`;
};

export const timeToSeconds = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 3600 + minutes * 60;
};