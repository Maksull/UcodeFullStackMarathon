const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const multer = require('multer'); // For handling file uploads


const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded form data

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); // Destination for uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Unique name for each file
    }
});
const upload = multer({ storage: storage });

// Use session middleware for login persistence
app.use(
    session({
        secret: 'secret_key', // Use a secure key
        resave: false,
        saveUninitialized: true,
    })
);

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'root',
    database: 'test1',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Route to display the registration form
app.get('/register', (req, res) => {
    res.render('register', { error: null });
});

// Handle registration form submission with avatar upload
app.post('/register', upload.single('avatar'), async (req, res) => {
    const { username, email, password } = req.body;
    const avatar = req.file ? `/uploads/${req.file.filename}` : null; // Store file path

    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUserQuery, [email], async (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            return res.render('register', { error: 'Email is already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (username, email, password, avatar) VALUES (?, ?, ?, ?)';
        db.query(query, [username, email, hashedPassword, avatar], (err, result) => {
            if (err) {
                console.log(err);
                res.render('register', { error: 'Registration failed. Please try again.' });
            } else {
                res.redirect('/login');
            }
        });
    });
});


// Route to display the login form
app.get('/login', (req, res) => {
    // Always pass an `error` variable to the template
    res.render('login', { error: null });
});

// Handle login form submission
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            // Pass the error message to the login template
            return res.render('login', { error: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare the provided password with the hashed password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (isValidPassword) {
            // Set the user in session
            req.session.user = user;
            res.redirect('/');
        } else {
            // Pass the error message to the login template
            res.render('login', { error: 'Invalid email or password' });
        }
    });
});

// Route to handle logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Middleware to check if user is logged in
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Fetch 5 random cards for player and AI
app.get('/', isAuthenticated, (req, res) => {
    const query = 'SELECT * FROM cards ORDER BY RAND() LIMIT 5';
    const battleHistoryQuery = 'SELECT result, timestamp FROM battle_results WHERE user_id = ? ORDER BY timestamp DESC';

    db.query(query, (err, playerCards) => {
        if (err) throw err;

        db.query(query, (err, aiCards) => {
            if (err) throw err;

            const userId = req.session.user.id;
            db.query(battleHistoryQuery, [userId], (err, battleHistory) => {
                if (err) throw err;

                const ai = {
                    username: 'AI',
                    avatar: '/uploads/default_ai_avatar.png' // Default avatar for AI
                };

                res.render('index', {
                    playerCards,
                    aiCards,
                    battleHistory,
                    user: req.session.user,
                    ai: ai // Hard-coded AI data
                });
            });
        });
    });
});


// Endpoint to get a new card for the player
app.post('/draw-card', (req, res) => {
    const drawnCardIds = req.body.drawnCardIds || []; // Ensure drawnCardIds is an array
    const query = 'SELECT * FROM cards WHERE id NOT IN (?) ORDER BY RAND() LIMIT 1';

    db.query(query, [drawnCardIds], (err, newCard) => {
        if (err) throw err;
        if (newCard.length > 0) {
            res.json(newCard[0]); // Send the new card back to the client
        } else {
            res.status(404).json({ error: 'No more cards available' }); // Handle case where no cards are left
        }
    });
});

// Endpoint to get a new card for the AI
app.post('/draw-ai-card', (req, res) => {
    const drawnCardIds = req.body.drawnCardIds || []; // Ensure drawnCardIds is an array
    const query = 'SELECT * FROM cards WHERE id NOT IN (?) ORDER BY RAND() LIMIT 1';

    db.query(query, [drawnCardIds], (err, newCard) => {
        if (err) throw err;
        if (newCard.length > 0) {
            res.json(newCard[0]); // Send the new card back to the client
        } else {
            res.status(404).json({ error: 'No more cards available' }); // Handle case where no cards are left
        }
    });
});


// Store battle results after game
app.post('/gameover', isAuthenticated, (req, res) => {
    const { winner } = req.body;
    const result = winner === 'Player' ? 'win' : 'loss';
    const userId = req.session.user.id;

    const query = 'INSERT INTO battle_results (user_id, result) VALUES (?, ?)';
    db.query(query, [userId, result], (err, result) => {
        if (err) throw err;
        res.redirect(`/result?winner=${winner}`);
    });
});

app.get('/result', isAuthenticated, (req, res) => {
    const winner = req.query.winner;
    res.render('result', { winner, user: req.session.user });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
