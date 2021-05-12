export const IS_EMAIL = (str) => {
    if (!IS_EMPTY(str)) return false;
    if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str)) return false;
    return true;
}

export const IS_EMPTY = (str) => {
    str = str.replace(/\s/g, '')
    if (str == '' || str == null || str == undefined) return false;
    return true;
}