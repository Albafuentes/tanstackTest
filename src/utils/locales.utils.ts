export const getTimeZone = (): string => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const getLocale = (): string => {
    return navigator.language;
};


export const translate = (translation: string, interpolation?: { [key: string]: string }) => {
    if (!translation || translation.length === 0) return "";

    const parts = String(translation).split(/({{.*?}})/g);

    const text = parts.map((part) => {
        const interpolationPart = part.match(/{{(.*?)}}/);
        const interpolationKey = part.replace("{{", "").replace("}}", "");

        if (interpolationPart) {
            const partWithInterpolation = interpolation?.[interpolationKey];

            return partWithInterpolation === null || partWithInterpolation === undefined ? part : partWithInterpolation;
        }

        return part;
    });

    return text.join("");
};