import express from 'express';
import session from 'express-session';
import expressThymeleaf from 'express-thymeleaf';
import path from 'path';
import { TemplateEngine } from 'thymeleaf';
import { File } from './File.js';
import { FileList } from './FileList.js';

const app = express();
const templateEngine = new TemplateEngine();

app.engine('html', expressThymeleaf(templateEngine));
app.set('view engine', 'html');
app.set('views', path.resolve());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		name: 'sprint07_t03',
		secret: 'sprint07_t03',
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

const addSession = (req, session) => req.session.showAd = session;

app.get('/', async (req, res) => {
	const files = new FileList();
	if (files.hasFiles()) {
		console.log(JSON.stringify(files.getList()));
		return res.render('index', { files: JSON.stringify(files.getList()) });
	}
	res.render('index');
});

app.post('/create', async (req, res) => {
	const data = req.body;
	addSession(req, 'a');
	console.log(data);
	new File(data.fileName).write(data.content);
	res.redirect('/');
});

app.post('/delete', async (req, res) => {
	const data = req.body;
	new File(data.deleteFile).delete();
	return res.redirect('/');
});
