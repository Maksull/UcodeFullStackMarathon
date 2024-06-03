import express from 'express';
import fs from 'fs';
import path from 'path';
import { Note } from './Note.js';

function getIndex(insert = '') {
	try {
		const data = fs.readFileSync('index.html', 'utf-8');
		return data.replace('CONTENT', insert);
	} catch (error) {
		console.error('Error reading index.html:', error);
		return '';
	}
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/js', express.static(path.resolve() + '/'));

app.get('/', (req, res) => {
	res.send(getIndex());
});

app.post('/', (req, res) => {
	const note = new Note();
	note.add(req.body);
	res.redirect('/');
});

app.get('/list', (req, res) => {
	res.json({ list: new Note().getList() });
});

app.get('/show', (req, res) => {
	res.send(getIndex(new Note().getDetail(req.query.id)));
});

app.get('/delete', (req, res) => {
	const note = new Note();
	note.delete(req.query.id);
	res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
