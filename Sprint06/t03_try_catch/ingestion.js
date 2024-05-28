const { Product } = require('./product');
const EatException = require('./eat-exception');

class Ingestion {
    constructor(meal_type, id) {
        this.id = id;
        this.meal_type = meal_type;
        this.products = [];
        this.day_of_diet = 0;
    }

    setProduct(product) {
        this.products.push(product);
    }

    getProductInfo(productName) {
        const product = this.products.find(p => p.aname === productName);
        if (product) {
            return { kcal: product.kcal_per_portion };
        }
        return null;
    }

    getFromFridge(productName) {
        const product = this.products.find(p => p.aname === productName);
        if (product) {
            try {
                product.check();
            } catch (e) {
                e.message = `Too many calories in ${productName} for ${this.meal_type}`;
                throw e;
            }
        }
    }
}

module.exports.Ingestion = Ingestion;
