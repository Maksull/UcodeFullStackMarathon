import express from 'express';
import session from 'express-session';
import expressThymeleaf from 'express-thymeleaf';
import { TemplateEngine } from 'thymeleaf';
import path from 'path';
import fetch from 'node-fetch';
import crypto from 'crypto';

const app = express();

const templateEngine = new TemplateEngine();
app.use('/public', express.static(path.resolve() + '/'));
app.engine('html', expressThymeleaf(templateEngine));
app.set('view engine', 'html');
app.set('views', path.resolve());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		name: 'sprint07_t06',
		secret: 'sprint07_t06',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 100,
		},
	})
);

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/api', async (req, res) => {
	const KEY_PRIVATE = process.env.KEY_PRIVATE || '';
	const KEY_PUBLIC = process.env.KEY_PUBLIC || '';
	const ts = Date.now();
	const hash = crypto.createHash('md5').update(`${ts}${KEY_PRIVATE}${KEY_PUBLIC}`).digest('hex');
	const apiUrl = `http://gateway.marvel.com/v1/public/characters?apikey=${KEY_PUBLIC}&hash=${hash}&ts=${ts}`;

	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch data from Marvel API' });
	}
});


const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
