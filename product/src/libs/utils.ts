export const zerofill = (val: string | number, maxLength = 2) => {
    return String(val).padStart(maxLength, '0')
}
