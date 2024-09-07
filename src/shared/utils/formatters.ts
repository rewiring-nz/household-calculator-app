

export  const formatNZD = (value: number | undefined, decimals = 2) => {
    if (value === undefined) return '';
    // return ` $${value.toLocaleString('en-NZ')}`;
    // return ` $${value.toFixed(2)}`;
    if (value < 0) {
        return ` $${Number(Math.abs(value).toFixed(decimals)).toLocaleString('en-NZ')}`;
    }
    return ` $${Number(value.toFixed(decimals)).toLocaleString('en-NZ')}`;
};