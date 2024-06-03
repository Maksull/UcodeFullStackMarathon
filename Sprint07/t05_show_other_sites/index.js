import express from 'express';
import session from 'express-session';
import expressThymeleaf from 'express-thymeleaf';
import { TemplateEngine } from 'thymeleaf';
import path from 'path';
import got from 'got';
import cheerio from 'cheerio';

const app = express();

const templateEngine = new TemplateEngine();
app.use('/js', express.static(path.resolve() + '/'));
app.engine('html', expressThymeleaf(templateEngine));
app.set('view engine', 'html');
app.set('views', path.resolve());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		name: 'sprint07_t05',
		secret: 'sprint07_t05',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 100,
		},
	})
);

app.get('/', async (req, res) => {
	try {
		const URL = req.query.url;
		if (URL) {
			const response = await got(URL);
			const $ = cheerio.load(response.body);
			const htmlContent = $('body').html().trim();
			res.render('index', { urlName: URL, url: htmlContent });
			return;
		}
		res.render('index', { url: 'Type a URL...' });
	} catch (error) {
		console.error('Error fetching or parsing HTML:', error.message);
		res.status(500).send('Internal Server Error');
	}
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
