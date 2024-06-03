import express from 'express';
import session from 'express-session';
import expressThymeleaf from 'express-thymeleaf';
import path from 'path';
import { TemplateEngine } from 'thymeleaf';
import { ListAvengerQuotes } from './ListAvengerQuotes.js';

const app = express();

const data = [
	{
		id: 1,
		author: "Iron Man",
		quote: "I am Iron Man.",
		photo: "ironman.jpg",
		publishDate: "2024-06-02",
		comments: [
			{
				id: 1,
				user: "Captain America",
				comment: "Great quote!"
			},
			{
				id: 2,
				user: "Thor",
				comment: "Indeed!"
			}
		]
	},
	{
		id: 2,
		author: "Captain America",
		quote: "I can do this all day.",
		photo: "captainamerica.jpg",
		publishDate: "2024-06-02",
		comments: [
			{
				id: 1,
				user: "Iron Man",
				comment: "Classic!"
			}
		]
	}
];

const templateEngine = new TemplateEngine();
app.use('/js', express.static(path.resolve() + '/'));
app.engine('html', expressThymeleaf(templateEngine));
app.set('view engine', 'html');
app.set('views', path.resolve());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		name: 'sprint07_t04',
		secret: 'sprint07_t04',
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

app.get('/XML', (req, res) => {
	try {
		const listAvengerQuotes = new ListAvengerQuotes(data);
		const xmlData = {
			to: listAvengerQuotes.toXML(),
			from: listAvengerQuotes.fromXML()
		};
		res.json(xmlData);
	} catch (err) {
		console.error(`Error processing XML: ${err.message}`);
		res.status(500).send('Internal Server Error');
	}
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
