
export const dateToStr = (data) => {
    if (data === null || data === undefined)
        return "";
    return new Date(data).toLocaleDateString('es-ES', {year: "numeric", month: "2-digit", day: "2-digit"});
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

