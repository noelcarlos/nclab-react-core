
import {_t} from "./Translator";

export const dateToStr = (data) => {
    if (data === null || data === undefined)
        return "";
    return new Date(data).toLocaleDateString('es-ES', {year: "numeric", month: "2-digit", day: "2-digit"});
}

export const dateTimeToStr = (data) => {
    if (data === null || data === undefined)
        return "";
    return new Date(data).toLocaleDateString('es-ES', {year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit"
    });
}

export const boolToStr = (data) => {
    if (data === null || data === undefined)
        return "";
    return data ? "Si" : "No";
}

export const periodToStr = (data) => {
    if (data === null || data === undefined)
        return "";
    switch (data) {
        case "M1": return "Mensual";
        default: return data;
    }
}

export const numberToStr = (data, decimals = 2) => {
    if (data === null || data === undefined)
        return "";
    return Number(data).toFixed(2);
}

export const moneyToStr = (data, decimals = 2, symbol = "EUR") => {
    if (data === null || data === undefined)
        return "";
    return new Intl.NumberFormat('de', {
        style: 'currency', 
        useGrouping: true, 
        currency: symbol,
        minimumIntegerDigits: 1,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(data);
}

export const dateTimeShortToStr = (data) => {
    if (data === null || data === undefined)
        return "";
    return new Date(data).toLocaleDateString('es-ES', {year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", timeZone: 'UTC'
    });
}

export const timeShortToStr = (data) => {
    if (data === null || data === undefined)
        return "";
    return new Date(data).toLocaleTimeString('es-ES', {
        hour: "2-digit", minute: "2-digit", timeZone: 'UTC'
    });
}

export const format = (fmt, ...theArgs) => {
    return fmt.replace(/\{(\d+)\}/g, function(v) {
      	const index = v[1];
        return theArgs[index];
    });
}