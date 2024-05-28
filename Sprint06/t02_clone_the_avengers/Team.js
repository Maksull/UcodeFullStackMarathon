module.exports.Team = class Team {
    constructor(id, avengers) {
        this.id = id;
        this.avengers = avengers;
    }

    battle(damage) {
        this.avengers.forEach(avenger => {
            avenger.hp -= damage.damage;
        });
    }

    calculateLosses(clonedTeam) {
        const losses = clonedTeam.filter(avenger => avenger.hp <= 0).length;

        if (losses === 0) {
            console.log("We haven't lost anyone in this battle!");
        } else {
            console.log(`In this battle we lost ${losses} Avenger${losses > 1 ? 's' : ''}`);
        }
    }

    clone() {
        let arr = []
        this.avengers.forEach(element => {
            const aven = Object.assign({}, element)
            Object.setPrototypeOf(aven, Object.getPrototypeOf(element))
            arr.push(aven)
        })
        this.avengers = arr;

        return this.avengers = arr;
    }
}