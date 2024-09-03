const Model = require('../model');

class Hero extends Model {
    static tableName = 'heroes'; // Define the table name

    constructor(attributes) {
        super(attributes);
    }

    static find(id) {
        return super.find(id);
    }

    delete() {
        return super.delete();
    }

    save() {
        return super.save();
    }
}

module.exports = Hero;
