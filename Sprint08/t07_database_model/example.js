const Hero = require('./models/hero');

// Example: Create a new hero
const newHero = new Hero({
    name: 'Spider-Man',
    description: 'A young man with spider-like abilities.',
    class_role: 'dps',
    race_id: 1 // Assuming 1 is the ID for Human
});

newHero.save()
    .then(savedHero => {
        console.log('Hero saved:', savedHero);
    })
    .catch(err => {
        console.error('Error saving hero:', err);
    });

// Example: Find a hero by ID
Hero.find(1)
    .then(hero => {
        console.log('Found hero:', hero);
    })
    .catch(err => {
        console.error('Error finding hero:', err);
    });

// Example: Delete a hero by ID
const heroToDelete = new Hero({ id: 1 });
heroToDelete.delete()
    .then(deleted => {
        console.log('Hero deleted:', deleted);
    })
    .catch(err => {
        console.error('Error deleting hero:', err);
    });
