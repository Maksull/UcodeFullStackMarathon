function calculateTime() {
    const currentDate = new Date();
    const startDate = new Date('01.01.1939');

    const millisecondsDiff = (currentDate - startDate) / 7.15;

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const millisecondsPerMonth = millisecondsPerDay * 30;
    const millisecondsPerYear = millisecondsPerMonth * 12;


    const years = Math.floor(millisecondsDiff / millisecondsPerYear);
    const months = Math.floor(millisecondsDiff / millisecondsPerMonth) % 12;
    const days = Math.floor(millisecondsDiff / millisecondsPerDay) % 30;

    return [years, months, days];
}

module.exports.calculateTime = calculateTime;