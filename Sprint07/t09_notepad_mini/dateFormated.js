export class FormatDate {
    constructor(timestamp) {
        this.date = new Date(timestamp);
    }

    getDate() {
        return `${this.date.getFullYear()}-${this.format(this.date.getMonth() + 1)}-${this.format(this.date.getDate())} ${this.format(this.date.getHours())}:${this.format(this.date.getMinutes())}:${this.format(this.date.getSeconds())}`;
    }

    format(num) {
        return num < 10 ? `0${num}` : num;
    }
}
