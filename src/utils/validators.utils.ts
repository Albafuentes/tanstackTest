// string validators
export const isValidString = (value: unknown): boolean => {
    return typeof value === "string" && value.trim().length > 0;
};

export const isValidNumber = (value: unknown): boolean => {
    return typeof value === "number" && !Number.isNaN(value);
};

// date validators
const isoDateOnly = /^\d{4}-\d{2}-\d{2}$/;
const isoDateTime =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})?$/;

export const isAValidISODate = (date: string): boolean => {
    const trimmed = date.trim();
    if (!trimmed) return false;

    if (!isoDateTime.test(trimmed) && !isoDateOnly.test(trimmed)) {
        return false;
    }

    const parsed = new Date(trimmed);
    return !Number.isNaN(parsed.getTime());
};

export const isPrefersReducedMotion = (): boolean => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};