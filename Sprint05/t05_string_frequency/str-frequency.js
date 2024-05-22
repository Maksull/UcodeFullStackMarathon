module.exports = class StrFrequency {
    constructor(str) {
        this.str = str;
    }

    letterFrequencies() {
        const string = this.str.toUpperCase();
        const counts = {};

        for (const ch of string) {
            if (/[A-Z]/.test(ch)) {
                counts[ch] = (counts[ch] || 0) + 1;
            }
        }

        return counts;
    }

    wordFrequencies() {
        if (!this.str) {
            return { '': 1 };
        }

        const words = this.str.split(/[^a-zA-Z]+/).filter(Boolean);
        const counts = {};

        for (const word of words) {
            const upperWord = word.toUpperCase();
            counts[upperWord] = (counts[upperWord] || 0) + 1;
        }

        return counts;
    }

    reverseString() {
        return this.str.split("").reverse().join("");
    }
}
