

export const formatNZD = (value: number | undefined, decimals = 2) => {
    if (value === undefined) return '';
    
    const formattedValue = value.toFixed(decimals);
    const absoluteValue = Math.abs(Number(formattedValue)).toLocaleString('en-NZ', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });

    return value < 0 ? `$${absoluteValue}` : `-$${absoluteValue}`;
};


export const formatTonnes = (value: number | undefined): string => {
    // (results?.emissions?.perYear?.difference || 0) *-1
    if (value === undefined) return '';
    return `${(value/1000*-1).toFixed(0)}`;
};

export const formatKgs = (value: number | undefined): string => {
    if (value === undefined) return '';
    if( value === 1) return `${(value*-1).toFixed(0)} kg `;
    return `${(value*-1).toFixed(0)} kgs `;
};