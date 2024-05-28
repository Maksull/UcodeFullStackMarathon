function monthDays(year, month) {
    if (month === 2) {
        if (year % 4 !== 0 || (year % 100 === 0 && year % 400 !== 0)) {
            return 28;
        } else {
            return 29;
        }
    } else {
        if ((month < 8 && (month % 2) === 0) || (month > 7 && (month % 2) === 1)) {
            return 31;
        } else {
            return 30;
        }
    }
}

function calculateTime() {
    const currentDate = new Date();
    const startDate = new Date('01.01.1939');

    let years, months, days, hours, minutes, seconds;

    years = currentDate.getUTCFullYear() - startDate.getUTCFullYear();
    months = currentDate.getUTCMonth() - startDate.getUTCMonth();
    days = currentDate.getUTCDate() - startDate.getUTCDate();
    hours = currentDate.getUTCHours() - startDate.getUTCHours();
    minutes = currentDate.getUTCMinutes() - startDate.getUTCMinutes();
    seconds = currentDate.getUTCSeconds() - startDate.getUTCSeconds();

    let carry = 0;

    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
        carry = 1;
    }
    if (days < 0) {
        days = monthDays(startDate.getUTCFullYear(), startDate.getUTCMonth() + 1) - startDate.getUTCDate() + currentDate.getUTCDate() - carry;
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    return {
        year: years,
        month: months,
        day: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        years() {
            return this.year;
        },
        months() {
            return this.month;
        },
        days() {
            return this.day;
        },
        hours() {
            return this.hours;
        },
        minutes() {
            return this.minutes;
        },
        seconds() {
            return this.seconds;
        }
    };
}

module.exports.calculateTime = calculateTime;
