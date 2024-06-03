import express from 'express';
import expressThymeleaf from 'express-thymeleaf';
import session from 'express-session';
import path from 'path';
import iconv from 'iconv-lite';
import { TemplateEngine } from 'thymeleaf';

const app = express();
const templateEngine = new TemplateEngine();

app.engine('html', expressThymeleaf(templateEngine));
app.set('view engine', 'html');
app.set('views', path.resolve());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		name: 'sprint07_t02',
		secret: 'sprint07_t02',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 100,
		},
	})
);

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/charset', (req, res) => {
	const text = req.body.text;
	const charset = req.body.selected.toLowerCase();

	let newText;
	switch (charset) {
		case 'utf-8':
			newText = text;
			break;
		case 'iso-8859-1':
			newText = iconv.encode(iconv.decode(text, 'utf8'), 'iso-8859-1').toString();
			break;
		case 'windows-1252':
			newText = iconv.encode(iconv.decode(text, 'utf8'), 'cp1252').toString();
			break;
		default:
			throw new Error(`Undefined charset: ${charset}`);
	}

	res.render('index', { input: text, [charset.toLowerCase()]: newText });
});
