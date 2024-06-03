import express from 'express';
import session from 'express-session';
import expressThymeleaf from 'express-thymeleaf';
import { TemplateEngine } from 'thymeleaf';
import path from 'path';

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
		name: 'sprint07_t07',
		secret: 'sprint07_t07',
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 100,
		},
	})
);

app.get('/', (req, res) => {
	req.session.views = (req.session.views || 0) + 1;
	res.render('index');
});

app.get('/viewsCount', async (req, res) => {
	res.json({ views: req.session.views });
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

