function firstUpper(string) {
    if (string == null) {
        return "";
    }
    string = string.trim().toLowerCase();

    if (/^[a-zA-Z]/.test(string)) {
        string = string.charAt(0).toUpperCase() + string.slice(1);
    }

    return string;
}

module.exports.firstUpper = firstUpper;
