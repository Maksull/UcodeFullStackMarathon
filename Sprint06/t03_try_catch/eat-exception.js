class EatException extends Error {
    constructor(str) {
        super(str)
        this.name = 'EatException'
        this.message = 'No more junk food, dumpling'
    }
}

module.exports.EatException = EatException