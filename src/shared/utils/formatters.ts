
// export  const formatNZD = (value: number | undefined, decimals = 2) => {
//     if (value === undefined) return '';
//     if (value < 0) {
//         return ` $${Number(Math.abs(value).toFixed(decimals)).toLocaleString('en-NZ')}`;
//     }
//     return ` $${Number(value.toFixed(decimals)).toLocaleString('en-NZ')}`;
// };

export const formatNZD = (value: number | undefined, decimals = 2) => {
    // console.log('formatNZD value', value);
    if (value === undefined) return '';    
    const formattedValue = (value).toFixed(decimals);
    const output = Number(formattedValue).toLocaleString('en-NZ', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
    return ` $${output}`;
};

export const formatSavingsNZD = (value: number | undefined, decimals = 2) => {
    // console.log('formatSavingsNZD value', value);
    if (value === undefined) return '';    
    const formattedValue = (value).toFixed(decimals);
    // console.log('formatSavingsNZD formattedValue', formattedValue);
    const absoluteValue = Math.abs(Number(formattedValue)).toLocaleString('en-NZ', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
    // console.log('formatSavingsNZD absoluteValue', absoluteValue);
    return value <= 0 ? `$${absoluteValue}` : `-$${absoluteValue}`;
};


export const formatTonnes = (value: number | undefined): string => {
    if (value === undefined) return '';
    return `${(value/1000*-1).toFixed(0)}`;
};

export const formatKgs = (value: number | undefined): string => {
    if (value === undefined) return '';
    if( value === 1) return `${(value*-1).toFixed(0)} kg `;
    return `${(value*-1).toFixed(0)} kgs `;
};