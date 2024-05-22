function checkDivision(a, b) {
    a = a ?? 1;
    b = b ?? 60;

    for (let i = a; i <= b; i++) {
        let output = `The number ${i} `;
        let divisors = [];

        if (i % 2 === 0) {
            divisors.push('is divisible by 2');
        }
        if (i % 3 === 0) {
            divisors.push('is divisible by 3');
        }
        if (i % 10 === 0) {
            divisors.push('is divisible by 10');
        }

        if (divisors.length > 0) {
            console.log(output + divisors.join(', '));
        } else {
            console.log(output + '-');
        }
    }
}
module.exports.checkDivision = checkDivision;
